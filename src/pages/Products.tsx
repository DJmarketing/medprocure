
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, ChevronDown, ShoppingCart, Heart, BarChart2, GridIcon, Eye } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

// Mock data
import { products as mockProducts } from "@/data/mockProducts";
import { Product } from "@/types";

const ProductsPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [showInStock, setShowInStock] = useState(true);
  const [useImported, setUseImported] = useState(false);
  const [importedProducts, setImportedProducts] = useState<Product[]>([]);

  // Check for imported products on component mount
  useState(() => {
    const stored = localStorage.getItem('importedProducts');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setImportedProducts(parsed);
        setUseImported(true);
      } catch (error) {
        console.error('Error parsing imported products:', error);
      }
    }
  });

  // Get products from localStorage or fallback to mock data
  const getProducts = (): Product[] => {
    if (useImported && importedProducts.length > 0) {
      return importedProducts;
    }
    return mockProducts;
  };

  const products = getProducts();

  const filteredProducts = products.filter(product => {
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    
    // Filter by supplier
    if (selectedSupplier !== "all" && product.supplier !== selectedSupplier) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by availability
    if (showInStock && product.stock === 0) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Browse and order from our catalog of medical supplies and pharmaceuticals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="hidden md:flex gap-1 border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-none", 
                view === "grid" && "bg-accent text-accent-foreground"
              )}
              onClick={() => setView("grid")}
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-none", 
                view === "list" && "bg-accent text-accent-foreground"
              )}
              onClick={() => setView("list")}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <Card className="col-span-12 md:col-span-3 p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Search</h3>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <Select 
              defaultValue="all"
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                <SelectItem value="medical-supplies">Medical Supplies</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="ppe">PPE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Supplier</h3>
            <Select 
              defaultValue="all"
              onValueChange={setSelectedSupplier}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Suppliers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                <SelectItem value="MedSupply Co.">MedSupply Co.</SelectItem>
                <SelectItem value="PharmaDirect">PharmaDirect</SelectItem>
                <SelectItem value="Healthcare Supplies">Healthcare Supplies</SelectItem>
                <SelectItem value="MedEquip Plus">MedEquip Plus</SelectItem>
                <SelectItem value="VitalCare">VitalCare</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-4">Price Range</h3>
            <Slider 
              defaultValue={[0, 500]} 
              max={500} 
              step={10}
              onValueChange={setPriceRange}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-semibold">Availability</h3>
            <div className="flex items-center space-x-2">
              <Switch 
                id="in-stock" 
                checked={showInStock}
                onCheckedChange={setShowInStock}
              />
              <Label htmlFor="in-stock">Show only in-stock items</Label>
            </div>
          </div>
          
          <Separator />
          
          <Button className="w-full" variant="outline">
            Reset Filters
          </Button>
        </Card>

        {/* Products */}
        <div className="col-span-12 md:col-span-9 space-y-4">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid grid-cols-4 h-auto p-1">
              <TabsTrigger value="all" className="text-xs md:text-sm py-2">All Products</TabsTrigger>
              <TabsTrigger value="pharmaceuticals" className="text-xs md:text-sm py-2">Pharmaceuticals</TabsTrigger>
              <TabsTrigger value="supplies" className="text-xs md:text-sm py-2">Medical Supplies</TabsTrigger>
              <TabsTrigger value="equipment" className="text-xs md:text-sm py-2">Equipment</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
                {importedProducts.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {useImported ? 'Imported Catalog' : 'Demo Data'}
                  </Badge>
                )}
              </p>
              {importedProducts.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setUseImported(!useImported)}
                >
                  {useImported ? 'View Demo Data' : 'View Imported Catalog'}
                </Button>
              )}
            </div>

            <TabsContent value="all" className="m-0">
              <div className={cn(
                "grid gap-4",
                view === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {filteredProducts.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground mb-4">No products match your filters</p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedSupplier("all");
                      setPriceRange([0, 500]);
                      setShowInStock(true);
                    }}>
                      Reset all filters
                    </Button>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={view}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="pharmaceuticals" className="m-0">
              <div className={cn(
                "grid gap-4",
                view === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {products
                  .filter(p => p.category === "pharmaceuticals")
                  .map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={view}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="supplies" className="m-0">
              <div className={cn(
                "grid gap-4",
                view === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {products
                  .filter(p => p.category === "medical-supplies")
                  .map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={view}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="m-0">
              <div className={cn(
                "grid gap-4",
                view === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {products
                  .filter(p => p.category === "equipment")
                  .map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={view}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
