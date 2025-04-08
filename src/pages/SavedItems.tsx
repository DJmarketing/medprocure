
import { Bookmark, HeartIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SAVED_PRODUCTS = [
  { 
    id: "p1", 
    name: "Surgical Gloves (Box of 100)", 
    category: "Supplies",
    price: 24.99,
    savedDate: "2025-03-12"
  },
  { 
    id: "p2", 
    name: "Digital Thermometer", 
    category: "Equipment",
    price: 59.95,
    savedDate: "2025-03-20"
  },
  { 
    id: "p3", 
    name: "Stethoscope", 
    category: "Equipment",
    price: 89.99,
    savedDate: "2025-03-25"
  },
  { 
    id: "p4", 
    name: "Bandages (Pack of 50)", 
    category: "Supplies",
    price: 12.50,
    savedDate: "2025-04-01"
  },
];

const SAVED_SUPPLIERS = [
  {
    id: "s1",
    name: "MedSupply Co.",
    category: "Equipment",
    rating: 4.8,
    savedDate: "2025-03-15"
  },
  {
    id: "s2",
    name: "CleanMed Solutions",
    category: "Cleaning Supplies",
    rating: 4.5,
    savedDate: "2025-03-22"
  },
  {
    id: "s3",
    name: "PharmaWholesale Ltd",
    category: "Pharmaceuticals",
    rating: 4.9,
    savedDate: "2025-03-30"
  }
];

const SavedItems = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Saved Items</h1>
        <p className="text-muted-foreground">
          Manage your saved products, suppliers, and frequently purchased items.
        </p>
      </div>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="products">Saved Products</TabsTrigger>
          <TabsTrigger value="suppliers">Saved Suppliers</TabsTrigger>
          <TabsTrigger value="lists">My Lists</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="h-5 w-5 text-medical-primary" />
                Saved Products
              </CardTitle>
              <CardDescription>
                Products you've saved for later reference or purchasing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date Saved</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAVED_PRODUCTS.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.savedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Add to Cart</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-medical-primary" />
                Saved Suppliers
              </CardTitle>
              <CardDescription>
                Suppliers you've saved for quick access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Date Saved</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAVED_SUPPLIERS.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.category}</TableCell>
                      <TableCell>{supplier.rating}/5</TableCell>
                      <TableCell>{supplier.savedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">View Catalog</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Saved Lists</CardTitle>
              <CardDescription>
                Create and manage custom product lists for different departments or purposes.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-medical-light p-3 mb-4">
                <Bookmark className="h-6 w-6 text-medical-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No lists created yet</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Create custom lists to organize products by department, purpose, or any other category.
              </p>
              <Button>Create Your First List</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedItems;
