import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { Product } from "@/types";

interface ColumnMapping {
  [key: string]: string;
}

interface BulkUploadComponentProps {
  onImportComplete?: (products: Product[]) => void;
}

const BulkUploadComponent = ({ onImportComplete }: BulkUploadComponentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [preview, setPreview] = useState<Product[]>([]);
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview' | 'complete'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const productFields = [
    { key: 'name', label: 'Product Name', required: true },
    { key: 'description', label: 'Description', required: false },
    { key: 'price', label: 'Price', required: true },
    { key: 'compareAtPrice', label: 'Compare At Price', required: false },
    { key: 'category', label: 'Category', required: true },
    { key: 'subcategory', label: 'Subcategory', required: false },
    { key: 'supplier', label: 'Supplier', required: true },
    { key: 'stock', label: 'Stock', required: true },
    { key: 'sku', label: 'SKU', required: true },
    { key: 'brand', label: 'Brand', required: false },
    { key: 'uom', label: 'Unit of Measure', required: false },
    { key: 'uomQuantity', label: 'UOM Quantity', required: false },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        if (jsonData.length > 0) {
          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1);
          
          setHeaders(headers);
          setData(rows);
          
          // Auto-detect common mappings
          const autoMapping: ColumnMapping = {};
          headers.forEach((header, index) => {
            const lowerHeader = header.toLowerCase();
            if (lowerHeader.includes('name') || lowerHeader.includes('product')) {
              autoMapping['name'] = header;
            } else if (lowerHeader.includes('description')) {
              autoMapping['description'] = header;
            } else if (lowerHeader.includes('price') && !lowerHeader.includes('compare')) {
              autoMapping['price'] = header;
            } else if (lowerHeader.includes('category')) {
              autoMapping['category'] = header;
            } else if (lowerHeader.includes('supplier')) {
              autoMapping['supplier'] = header;
            } else if (lowerHeader.includes('stock') || lowerHeader.includes('quantity')) {
              autoMapping['stock'] = header;
            } else if (lowerHeader.includes('sku')) {
              autoMapping['sku'] = header;
            } else if (lowerHeader.includes('brand')) {
              autoMapping['brand'] = header;
            } else if (lowerHeader.includes('uom') || lowerHeader.includes('unit')) {
              autoMapping['uom'] = header;
            }
          });
          
          setMapping(autoMapping);
          setStep('mapping');
          
          toast({
            title: "File uploaded successfully",
            description: `Loaded ${rows.length} rows from ${uploadedFile.name}`,
          });
        }
      } catch (error) {
        toast({
          title: "Error reading file",
          description: "Please make sure the file is a valid Excel or CSV file.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsArrayBuffer(uploadedFile);
  };

  const generatePreview = () => {
    const mappedProducts: Product[] = data.slice(0, 10).map((row, index) => {
      const product: any = {
        id: Date.now() + index,
        image: "/placeholder.svg",
        isBestSeller: false,
        availableFrom: 1,
      };

      Object.entries(mapping).forEach(([field, header]) => {
        const columnIndex = headers.indexOf(header);
        if (columnIndex !== -1) {
          const value = row[columnIndex];
          
          switch (field) {
            case 'price':
            case 'compareAtPrice':
            case 'stock':
            case 'uomQuantity':
              product[field] = parseFloat(value) || 0;
              break;
            default:
              product[field] = value?.toString() || '';
          }
        }
      });

      return product as Product;
    });

    setPreview(mappedProducts);
    setStep('preview');
  };

  const handleImport = () => {
    const allProducts: Product[] = data.map((row, index) => {
      const product: any = {
        id: Date.now() + index,
        image: "/placeholder.svg",
        isBestSeller: false,
        availableFrom: 1,
      };

      Object.entries(mapping).forEach(([field, header]) => {
        const columnIndex = headers.indexOf(header);
        if (columnIndex !== -1) {
          const value = row[columnIndex];
          
          switch (field) {
            case 'price':
            case 'compareAtPrice':
            case 'stock':
            case 'uomQuantity':
              product[field] = parseFloat(value) || 0;
              break;
            default:
              product[field] = value?.toString() || '';
          }
        }
      });

      return product as Product;
    });

    // Store in localStorage
    localStorage.setItem('importedProducts', JSON.stringify(allProducts));
    
    setStep('complete');
    onImportComplete?.(allProducts);
    
    toast({
      title: "Import completed successfully",
      description: `Imported ${allProducts.length} products to your catalog.`,
    });
  };

  const resetUpload = () => {
    setFile(null);
    setData([]);
    setHeaders([]);
    setMapping({});
    setPreview([]);
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (step === 'upload') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bulk Product Upload</CardTitle>
          <CardDescription>
            Import your product catalog from CSV or Excel files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">Upload Catalog File</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to upload a CSV or Excel file
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} className="gap-1">
              <Upload className="h-4 w-4" /> Choose File
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'mapping') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Map Columns</CardTitle>
          <CardDescription>
            Map your file columns to product fields
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label className="flex items-center gap-2">
                  {field.label}
                  {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                </Label>
                <Select
                  value={mapping[field.key] || 'skip'}
                  onValueChange={(value) => setMapping(prev => ({ 
                    ...prev, 
                    [field.key]: value === 'skip' ? '' : value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skip">-- Skip This Field --</SelectItem>
                    {headers.map((header) => (
                      <SelectItem key={header} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={resetUpload}>
              Back
            </Button>
            <Button onClick={generatePreview}>
              Preview Import
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'preview') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preview Import</CardTitle>
          <CardDescription>
            Review the first 10 products before importing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>UOM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {preview.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {product.uom && product.uomQuantity 
                        ? `${product.uom} of ${product.uomQuantity}`
                        : product.uom || 'Each'
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setStep('mapping')}>
              Back to Mapping
            </Button>
            <Button onClick={handleImport}>
              Import {data.length} Products
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Import Complete
        </CardTitle>
        <CardDescription>
          Your products have been successfully imported
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <FileSpreadsheet className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Successfully imported {data.length} products</h3>
            <p className="text-muted-foreground">Products are now available in your catalog</p>
          </div>
        </div>
        
        <Button onClick={resetUpload} className="w-full">
          Import Another File
        </Button>
      </CardContent>
    </Card>
  );
};

export default BulkUploadComponent;