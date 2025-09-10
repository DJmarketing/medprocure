import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Package, 
  Boxes, 
  Settings, 
  Search, 
  Plus,
  Check,
  X,
  Edit,
  Trash,
  Building,
  CreditCard,
  Bell,
  Upload,
  Database,
  AlertCircle,
  ShoppingBag,
  Store,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import BulkUploadComponent from "@/components/admin/BulkUploadComponent";
import { Product } from "@/types";

const AdminPanel = () => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const { toast } = useToast();
  const [importedProducts, setImportedProducts] = useState<Product[]>([]);

  const handleImportComplete = (products: Product[]) => {
    setImportedProducts(products);
    // Store in localStorage
    try {
      localStorage.setItem('importedProducts', JSON.stringify(products));
    } catch (error) {
      console.error('Failed to store products in localStorage:', error);
      // Continue without localStorage if quota exceeded
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wholesaler Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage your product catalog, inventory, and pricing
        </p>
      </div>
      
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-5 h-auto">
          <TabsTrigger value="products" className="text-xs md:text-sm py-2">
            Products
          </TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs md:text-sm py-2">
            Inventory
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-xs md:text-sm py-2">
            Orders
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xs md:text-sm py-2">
            Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs md:text-sm py-2">
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>
                  Manage your product listings and catalog information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <Input placeholder="Search products..." className="pl-8 w-64" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" /> Add Product
                  </Button>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "Sterile Surgical Gloves (Box of 100)", sku: "SG-1001-LRG", category: "Medical Supplies", price: "$49.99", stock: 25, status: "In Stock" },
                        { name: "Digital Infrared Thermometer", sku: "DT-2050", category: "Equipment", price: "$89.99", stock: 12, status: "In Stock" },
                        { name: "Acetaminophen 500mg (Bottle of 100)", sku: "ACT-500-100", category: "Pharmaceuticals", price: "$12.99", stock: 50, status: "In Stock" },
                        { name: "Disposable Face Masks (Box of 50)", sku: "FM-3PLY-50", category: "Medical Supplies", price: "$19.99", stock: 100, status: "In Stock" },
                        { name: "Blood Pressure Monitor - Digital", sku: "BPM-D200", category: "Equipment", price: "$79.99", stock: 8, status: "Low Stock" },
                        { name: "Digital Stethoscope", sku: "DS-BT100", category: "Equipment", price: "$249.99", stock: 0, status: "Out of Stock" },
                      ].map((product, i) => (
                        <TableRow key={i}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.price}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn(
                              "font-normal",
                              product.stock === 0 
                                ? "bg-red-100 text-red-800" 
                                : product.stock < 10 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-green-100 text-green-800"
                            )}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing 6 of 245 products
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <BulkUploadComponent onImportComplete={handleImportComplete} />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Create a new product in your catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="e.g. Surgical Gloves (Box of 100)" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Product Description</Label>
                    <Textarea id="productDescription" placeholder="Describe the product..." className="min-h-[100px]" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productSKU">SKU</Label>
                      <Input id="productSKU" placeholder="e.g. SG-1001-LRG" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productCategory">Category</Label>
                      <Input id="productCategory" placeholder="e.g. Medical Supplies" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Price ($)</Label>
                      <Input id="productPrice" type="number" placeholder="e.g. 49.99" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productStock">Initial Stock</Label>
                      <Input id="productStock" type="number" placeholder="e.g. 100" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop or click to upload product images
                      </p>
                      <Button variant="outline" className="gap-1">
                        <Upload className="h-4 w-4" /> Upload Image
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Additional Information</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="featuredProduct" className="cursor-pointer">Featured Product</Label>
                        <Switch id="featuredProduct" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="requiresPrescription" className="cursor-pointer">Requires Prescription</Label>
                        <Switch id="requiresPrescription" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hazardousMaterial" className="cursor-pointer">Hazardous Material</Label>
                        <Switch id="hazardousMaterial" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Product</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Inventory Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Products</span>
                    <span className="font-medium">245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">In Stock</span>
                    <span className="font-medium">198</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Low Stock</span>
                    <span className="font-medium text-amber-600">35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Out of Stock</span>
                    <span className="font-medium text-red-600">12</span>
                  </div>
                </div>
                
                <div className="h-[180px] bg-gray-50 rounded-md flex items-center justify-center">
                  <div className="text-center text-muted-foreground text-sm">
                    Inventory chart visualization
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">Export Inventory Report</Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>
                  Update stock levels and manage inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Search by SKU or name..." className="w-64" />
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                      </svg>
                    </Button>
                  </div>
                  <Button className="gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Bulk Update
                  </Button>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <input type="checkbox" className="rounded" />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-right">Current Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "Sterile Surgical Gloves (Box of 100)", sku: "SG-1001-LRG", stock: 25, status: "In Stock" },
                        { name: "Digital Infrared Thermometer", sku: "DT-2050", stock: 12, status: "In Stock" },
                        { name: "Acetaminophen 500mg (Bottle of 100)", sku: "ACT-500-100", stock: 50, status: "In Stock" },
                        { name: "Disposable Face Masks (Box of 50)", sku: "FM-3PLY-50", stock: 100, status: "In Stock" },
                        { name: "Blood Pressure Monitor - Digital", sku: "BPM-D200", stock: 8, status: "Low Stock", alert: true },
                        { name: "Digital Stethoscope", sku: "DS-BT100", stock: 0, status: "Out of Stock", alert: true },
                      ].map((product, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <input type="checkbox" className="rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{product.name}</div>
                          </TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell className="text-right">
                            <Input type="number" value={product.stock} className="w-20 text-right ml-auto" />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={cn(
                                "font-normal",
                                product.stock === 0 
                                  ? "bg-red-100 text-red-800" 
                                  : product.stock < 10 
                                    ? "bg-amber-100 text-amber-800" 
                                    : "bg-green-100 text-green-800"
                              )}>
                                {product.status}
                              </Badge>
                              {product.alert && (
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Update</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing 6 of 245 products
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardDescription>
                Products that need replenishment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Current Stock</TableHead>
                      <TableHead className="text-right">Reorder Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Blood Pressure Monitor - Digital", sku: "BPM-D200", stock: 8, reorderLevel: 10, status: "Low Stock" },
                      { name: "Digital Stethoscope", sku: "DS-BT100", stock: 0, reorderLevel: 5, status: "Out of Stock" },
                      { name: "Amoxicillin 500mg (Bottle of 30)", sku: "AMX-500-30", stock: 3, reorderLevel: 5, status: "Low Stock" },
                      { name: "Surgical Scrubs - Medium", sku: "SS-MED-BLU", stock: 4, reorderLevel: 10, status: "Low Stock" },
                      { name: "Pulse Oximeter - Fingertip", sku: "PO-FT100", stock: 7, reorderLevel: 10, status: "Low Stock" },
                    ].map((product, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="font-medium">{product.name}</div>
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                        <TableCell className="text-right">{product.reorderLevel}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "font-normal",
                            product.stock === 0 
                              ? "bg-red-100 text-red-800" 
                              : "bg-amber-100 text-amber-800"
                          )}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm">Restock</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Orders</CardTitle>
              <CardDescription>
                View and process incoming orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search orders..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Export
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M3 16v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
                      <path d="M7 10 L12 15 17 10" />
                      <path d="M12 15 L12 3" />
                    </svg>
                    Import
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "ORD-2023-8764", customer: "City Medical Center", date: "Apr 5, 2025", total: "$1,245.89", status: "Processing" },
                      { id: "ORD-2023-8749", customer: "Northside Clinic", date: "Apr 3, 2025", total: "$856.42", status: "Pending" },
                      { id: "ORD-2023-8732", customer: "County Hospital", date: "Apr 1, 2025", total: "$2,104.76", status: "Shipped" },
                      { id: "ORD-2023-8721", customer: "Westside Medical", date: "Mar 29, 2025", total: "$4,589.32", status: "Delivered" },
                      { id: "ORD-2023-8710", customer: "Seaside Pharmacy", date: "Mar 25, 2025", total: "$398.75", status: "Cancelled" },
                    ].map((order, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "font-normal",
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800" 
                              : order.status === "Processing" 
                                ? "bg-blue-100 text-blue-800" 
                                : order.status === "Shipped" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : order.status === "Cancelled" 
                                    ? "bg-red-100 text-red-800" 
                                    : "bg-gray-100 text-gray-800"
                          )}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Process</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 128 orders
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Shipped</span>
                    <span className="font-medium">36</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Delivered</span>
                    <span className="font-medium">52</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cancelled</span>
                    <span className="font-medium">4</span>
                  </div>
                </div>
                
                <div className="h-[180px] bg-gray-50 rounded-md flex items-center justify-center mt-4">
                  <div className="text-center text-muted-foreground text-sm">
                    Order status visualization
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "ORD-2023-8765", customer: "Eastside Pharmacy", time: "10:23 AM", total: "$874.50", status: "Pending" },
                    { id: "ORD-2023-8766", customer: "Family Medical Group", time: "11:45 AM", total: "$1,250.75", status: "Processing" },
                    { id: "ORD-2023-8767", customer: "University Hospital", time: "02:10 PM", total: "$3,456.25", status: "Pending" },
                  ].map((order, i) => (
                    <div key={i} className="border rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{order.total}</div>
                        <Badge variant="outline" className={cn(
                          "font-normal",
                          order.status === "Pending" 
                            ? "bg-gray-100 text-gray-800" 
                            : "bg-blue-100 text-blue-800"
                        )}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  View All
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "City Medical Center", orders: 48, spent: "$24,568.75" },
                    { name: "County Hospital", orders: 36, spent: "$18,934.50" },
                    { name: "Westside Medical", orders: 29, spent: "$15,487.25" },
                    { name: "Northside Clinic", orders: 25, spent: "$12,345.75" },
                    { name: "University Hospital", orders: 22, spent: "$10,876.50" },
                  ].map((customer, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
                      </div>
                      <div className="font-medium">{customer.spent}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Input placeholder="Search users..." className="pl-8 w-64" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" /> Add User
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "John Smith", email: "john.smith@medsupply.com", role: "Admin", status: "Active" },
                      { name: "Emily Johnson", email: "emily.j@medsupply.com", role: "Manager", status: "Active" },
                      { name: "Michael Brown", email: "m.brown@medsupply.com", role: "Inventory Manager", status: "Active" },
                      { name: "Sarah Williams", email: "s.williams@medsupply.com", role: "Sales Representative", status: "Active" },
                      { name: "David Miller", email: "david.m@medsupply.com", role: "Customer Support", status: "Inactive" },
                    ].map((user, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "font-normal",
                            user.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          )}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          {user.status === "Active" ? (
                            <Button variant="ghost" size="sm" className="text-red-600">Deactivate</Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-green-600">Activate</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Configure user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    name: "Admin", 
                    description: "Full system access and control",
                    permissions: [
                      "Product Management",
                      "Inventory Management",
                      "Order Management",
                      "User Management",
                      "Settings"
                    ]
                  },
                  { 
                    name: "Manager", 
                    description: "Manage products, inventory, and orders",
                    permissions: [
                      "Product Management",
                      "Inventory Management",
                      "Order Management",
                      "View Reports"
                    ]
                  },
                  { 
                    name: "Inventory Manager", 
                    description: "Manage inventory levels and stock",
                    permissions: [
                      "Inventory Management",
                      "View Products",
                      "View Reports"
                    ]
                  },
                  { 
                    name: "Sales Representative", 
                    description: "Manage orders and customer relationships",
                    permissions: [
                      "Order Management",
                      "View Products",
                      "View Reports"
                    ]
                  },
                ].map((role, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit Role</Button>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-medium mb-2">Permissions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {role.permissions.map((permission, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-4 col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Navigation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {[
                      { name: "General", icon: Settings },
                      { name: "Company Profile", icon: Building },
                      { name: "Integrations", icon: Database },
                      { name: "Billing", icon: CreditCard },
                      { name: "Notifications", icon: Bell },
                    ].map((item, i) => (
                      <Button 
                        key={i} 
                        variant="ghost" 
                        className={cn(
                          "w-full justify-start gap-2 rounded-none",
                          i === 0 && "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                      <path d="M12 13v8" />
                      <path d="M12 3v3" />
                    </svg>
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="M9.1 12a2.1 2.1 0 0 1 0-2.1" />
                      <path d="M14.9 12a2.1 2.1 0 0 0 0-2.1" />
                      <path d="M12 12.01V12" />
                    </svg>
                    Privacy & Security
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 3v3" />
                    </svg>
                    Help Center
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1 md:col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure your wholesaler account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="MedSupply Co." />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input id="contactEmail" type="email" defaultValue="contact@medsupply.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input id="contactPhone" type="tel" defaultValue="(555) 123-4567" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input id="websiteUrl" type="url" defaultValue="https://medsupply.com" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Business Hours</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weekdayHours">Weekdays</Label>
                        <Input id="weekdayHours" defaultValue="9:00 AM - 5:00 PM" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weekendHours">Weekends</Label>
                        <Input id="weekendHours" defaultValue="Closed" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">System Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailNotifications" className="cursor-pointer">
                          Email Notifications
                        </Label>
                        <Switch id="emailNotifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lowStockAlerts" className="cursor-pointer">
                          Low Stock Alerts
                        </Label>
                        <Switch id="lowStockAlerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="orderConfirmations" className="cursor-pointer">
                          Order Confirmations
                        </Label>
                        <Switch id="orderConfirmations" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 border-t flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Settings</CardTitle>
                  <CardDescription>
                    Configure shipping methods and options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Shipping Methods</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Standard Shipping</div>
                          <Switch defaultChecked />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="standardShippingPrice">Base Price</Label>
                            <Input id="standardShippingPrice" defaultValue="9.99" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="standardShippingDays">Estimated Days</Label>
                            <Input id="standardShippingDays" defaultValue="3-5" />
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Express Shipping</div>
                          <Switch defaultChecked />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expressShippingPrice">Base Price</Label>
                            <Input id="expressShippingPrice" defaultValue="19.99" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expressShippingDays">Estimated Days</Label>
                            <Input id="expressShippingDays" defaultValue="1-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Free Shipping Threshold</h3>
                    <div className="space-y-2">
                      <Label htmlFor="freeShippingThreshold">Minimum Order Amount for Free Shipping</Label>
                      <Input id="freeShippingThreshold" defaultValue="250.00" />
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 border-t flex justify-end">
                  <Button>Save Shipping Settings</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;