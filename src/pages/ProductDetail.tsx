
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Share, 
  Print, 
  FileText, 
  Check, 
  ShieldCheck, 
  Truck, 
  Store, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { products } from "@/data/mockProducts";

const getStockStatusColor = (stock: number) => {
  if (stock === 0) return "bg-red-100 text-red-800 hover:bg-red-200";
  if (stock < 10) return "bg-amber-100 text-amber-800 hover:bg-amber-200";
  return "bg-green-100 text-green-800 hover:bg-green-200";
};

const getStockStatusText = (stock: number) => {
  if (stock === 0) return "Out of Stock";
  if (stock < 10) return "Low Stock";
  return "In Stock";
};

// Mock data for supplier comparison
const supplierComparison = [
  { 
    id: 1, 
    name: "MedSupply Co.", 
    price: 149.99, 
    stock: 25, 
    deliveryDays: "1-2", 
    minOrder: 1,
    isPreferred: true  
  },
  { 
    id: 2, 
    name: "PharmaDirect", 
    price: 159.99, 
    stock: 18, 
    deliveryDays: "2-3", 
    minOrder: 1,
    isPreferred: false  
  },
  { 
    id: 3, 
    name: "Healthcare Supplies", 
    price: 144.99, 
    stock: 7, 
    deliveryDays: "3-5", 
    minOrder: 2,
    isPreferred: false  
  },
  { 
    id: 4, 
    name: "MedEquip Plus", 
    price: 154.99, 
    stock: 0, 
    deliveryDays: "1-2", 
    minOrder: 1,
    isPreferred: false  
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSupplier, setSelectedSupplier] = useState("1");
  
  // Find product by ID (in a real app, this would be a data fetch)
  const product = products.find(p => p.id.toString() === id) || products[0];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="text-sm text-muted-foreground">
          {product.category} / {product.subcategory}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg border p-6 flex items-center justify-center">
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="max-h-[300px] max-w-full object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className={cn("font-normal", getStockStatusColor(product.stock))}>
                {getStockStatusText(product.stock)}
              </Badge>
              {product.isBestSeller && (
                <Badge variant="secondary">Best Seller</Badge>
              )}
              <Badge variant="outline">SKU: {product.sku}</Badge>
            </div>
            
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.supplier}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
            {product.compareAtPrice && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Save ${(product.compareAtPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <Separator />
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Select Supplier</h3>
              <Select 
                defaultValue="1"
                onValueChange={setSelectedSupplier}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {supplierComparison.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name} - ${supplier.price.toFixed(2)} {supplier.isPreferred && "(Preferred)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quantity" className="text-sm">Quantity</Label>
                <div className="flex mt-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-r-none"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    -
                  </Button>
                  <Input 
                    id="quantity"
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="rounded-none w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-l-none"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button className="flex-1" disabled={product.stock === 0}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Print className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg border space-y-3">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-medical-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Quality Guaranteed</h4>
                <p className="text-xs text-muted-foreground">All products meet industry standards and regulations</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 text-medical-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Fast Shipping</h4>
                <p className="text-xs text-muted-foreground">1-5 business days depending on supplier</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-medical-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Easy Returns</h4>
                <p className="text-xs text-muted-foreground">30-day return policy on unopened items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Comparison</TabsTrigger>
          <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">Brand</div>
                    <div className="text-sm">{product.brand || "MedTech Pro"}</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">SKU</div>
                    <div className="text-sm">{product.sku}</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">Category</div>
                    <div className="text-sm">{product.category}</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">Main Material</div>
                    <div className="text-sm">Medical-Grade Silicone</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">Dimensions</div>
                    <div className="text-sm">10cm x 15cm x 5cm</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">Weight</div>
                    <div className="text-sm">250g</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">Certifications</div>
                    <div className="text-sm">FDA, CE, ISO 13485</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-sm font-medium">Sterile</div>
                    <div className="text-sm">Yes</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Product Description</h3>
                <p className="text-sm text-muted-foreground">{product.longDescription || product.description}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-medical-primary mt-0.5" />
                    <span>High-quality medical-grade materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-medical-primary mt-0.5" />
                    <span>Tested for safety and reliability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-medical-primary mt-0.5" />
                    <span>Easy to use and disposable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-medical-primary mt-0.5" />
                    <span>Individually packaged for sterility</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Comparison</CardTitle>
              <CardDescription>
                Compare prices across suppliers for the best value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead>Delivery Time</TableHead>
                    <TableHead>Min. Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierComparison.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {supplier.name}
                          {supplier.isPreferred && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Preferred
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${supplier.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("font-normal", getStockStatusColor(supplier.stock))}>
                          {getStockStatusText(supplier.stock)}
                        </Badge>
                      </TableCell>
                      <TableCell>{supplier.deliveryDays} business days</TableCell>
                      <TableCell>{supplier.minOrder} unit{supplier.minOrder > 1 ? 's' : ''}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          disabled={supplier.stock === 0}
                          variant={supplier.id.toString() === selectedSupplier ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSupplier(supplier.id.toString())}
                        >
                          {supplier.id.toString() === selectedSupplier ? "Selected" : "Select"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md flex items-start gap-2 text-sm">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <strong>Price Notification:</strong> Prices may fluctuate based on market conditions. The prices shown are current as of today.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>
                Delivery options and shipping policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Estimated Delivery Times</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Standard Shipping</TableHead>
                      <TableHead>Express Shipping</TableHead>
                      <TableHead>Minimum Order Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierComparison.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.deliveryDays} business days</TableCell>
                        <TableCell>Next business day*</TableCell>
                        <TableCell>${(supplier.minOrder * supplier.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-xs text-muted-foreground mt-2">*Additional charges apply for express shipping and may not be available for all locations.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Shipping Policies</h3>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Free standard shipping on orders over $250</li>
                  <li>Special shipping requirements for temperature-sensitive items</li>
                  <li>Additional handling fees may apply for hazardous materials</li>
                  <li>Delivery to healthcare facilities only for certain regulated products</li>
                </ul>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg border">
                <h3 className="font-medium mb-1">Special Handling</h3>
                <p className="text-sm text-muted-foreground">
                  This product requires special handling and storage. Temperature requirements: 15-25°C (59-77°F).
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Product Documents</CardTitle>
              <CardDescription>
                Technical specifications, safety data, and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Product Specification Sheet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Safety Data Sheet (SDS)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Certificate of Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  FDA Compliance Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  User Manual
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map(relatedProduct => (
              <Link 
                key={relatedProduct.id} 
                to={`/products/${relatedProduct.id}`}
                className="border rounded-lg overflow-hidden hover:border-medical-primary hover:shadow-sm transition-all"
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={relatedProduct.image || "/placeholder.svg"} 
                    alt={relatedProduct.name} 
                    className="max-h-full max-w-full object-contain p-2"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-2">{relatedProduct.name}</h4>
                  <p className="text-xs text-muted-foreground">{relatedProduct.supplier}</p>
                  <p className="font-semibold mt-1">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
