
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { ShoppingCart, Heart, Eye, BarChart2, Info } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

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

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (viewMode === "list") {
    return (
      <div className="border rounded-lg p-4 flex flex-col md:flex-row gap-4 hover:border-medical-primary hover:shadow-sm transition-all">
        <div className="w-full md:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain p-2"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">
                <Link to={`/products/${product.id}`} className="hover:text-medical-primary">
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-1">{product.supplier}</p>
            </div>
            <div className="flex items-center gap-1 mt-1 md:mt-0">
              <Badge variant="outline" className={cn("font-normal", getStockStatusColor(product.stock))}>
                {getStockStatusText(product.stock)}
              </Badge>
              {product.isBestSeller && (
                <Badge variant="secondary">Best Seller</Badge>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <Info className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Available from multiple suppliers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-xs text-muted-foreground">
                  Available from {product.availableFrom} suppliers
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/products/${product.id}`}>
                  <Eye className="h-4 w-4 mr-1" /> View
                </Link>
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" disabled={product.stock === 0} onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Grid view
  return (
    <div className="border rounded-lg overflow-hidden hover:border-medical-primary hover:shadow-sm transition-all flex flex-col">
      <div className="relative h-40 bg-gray-100 flex items-center justify-center">
        <img 
          src={product.image || "/placeholder.svg"} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain p-4"
        />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isBestSeller && (
            <Badge variant="secondary">Best Seller</Badge>
          )}
          <Badge variant="outline" className={cn("font-normal", getStockStatusColor(product.stock))}>
            {getStockStatusText(product.stock)}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium line-clamp-2 mb-1">
          <Link to={`/products/${product.id}`} className="hover:text-medical-primary">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mb-1">{product.supplier}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 mb-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground p-0">
                    <Info className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Available from multiple suppliers</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground">
              Available from {product.availableFrom} suppliers
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" size="icon" asChild className="col-span-1">
              <Link to={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button className="col-span-3" disabled={product.stock === 0} onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
