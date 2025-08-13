import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { CheckoutDialog } from "./CheckoutDialog";

export function CartSheet() {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
          </SheetHeader>
          
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-3 border rounded-lg">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 ml-auto"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="space-y-4">
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen}
      />
    </>
  );
}