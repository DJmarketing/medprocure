import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, MapPin, User } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.08; // 8% tax
  const shipping = totalPrice > 100 ? 0 : 9.99; // Free shipping over $100
  const finalTotal = totalPrice + tax + shipping;

  const handleInputChange = (field: string, value: string) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock payment processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderId} has been confirmed and will be processed shortly.`,
      });

      clearCart();
      onOpenChange(false);
      setIsProcessing(false);
      
      // Reset form
      setOrderData({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Order Summary
            </h3>
            <ScrollArea className="h-48 border rounded-lg p-3">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={orderData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={orderData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={orderData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </h3>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={orderData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={orderData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={orderData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </h3>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={orderData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={orderData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={orderData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Place Order - $${finalTotal.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}