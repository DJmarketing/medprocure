
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ShoppingCart, User, BellRing } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  // Mockup user info - would be replaced with context/state in real app
  const user = {
    name: "Dr. Jane Smith",
    role: "Healthcare Provider",
    initials: "JS",
    image: null,
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 px-4 flex items-center">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 lg:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-medical-primary flex items-center justify-center">
              <span className="text-white font-bold">VM</span>
            </span>
            <span className="text-xl font-bold text-medical-dark hidden md:inline-block">
              VitaMarket Connect
            </span>
          </Link>
          
          <div className="hidden md:flex items-center ml-6 w-64 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search"
              placeholder="Search products..." 
              className="pl-8 h-9 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <BellRing className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              2
            </Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || undefined} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/account" className="flex items-center gap-2 w-full">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/account/settings" className="flex items-center gap-2 w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/account/subscription" className="flex items-center gap-2 w-full">
                  Subscription
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/login" className="w-full">
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
