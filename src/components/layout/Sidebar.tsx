
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  User, 
  Settings, 
  Store, 
  Heart, 
  FileText,
  CreditCard,
  HelpCircle,
  X
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/products", label: "Products", icon: Package },
  { path: "/orders", label: "Orders", icon: ShoppingBag },
  { path: "/account", label: "Account", icon: User },
  { path: "/subscription", label: "Subscription", icon: CreditCard },
  { path: "/settings", label: "Settings", icon: Settings },
];

const quickLinks = [
  { path: "/saved-items", label: "Saved Items", icon: Heart },
  { path: "/wholesalers", label: "Wholesalers", icon: Store },
  { path: "/invoices", label: "Invoices", icon: FileText },
];

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  // Content of sidebar that's shared between desktop and mobile
  const SidebarContent = () => (
    <div className="px-3 py-4 space-y-6 h-full flex flex-col">
      <nav className="space-y-1">
        <h2 className="text-xs font-semibold text-gray-500 px-3 mb-2">MAIN NAVIGATION</h2>
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group",
              pathname === item.path 
                ? "bg-medical-light text-medical-primary" 
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 mr-2",
              pathname === item.path 
                ? "text-medical-primary" 
                : "text-gray-400 group-hover:text-gray-600"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div>
        <h2 className="text-xs font-semibold text-gray-500 px-3 mb-2">QUICK LINKS</h2>
        <nav className="space-y-1">
          {quickLinks.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors group"
            >
              <item.icon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-600" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-3 py-3 mt-auto">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-sm font-medium text-gray-800 mb-1">MedProcure Pro</p>
          <p className="text-xs text-gray-500 mb-2">Your subscription is active</p>
          <div className="flex gap-2">
            <Link 
              to="/subscription" 
              onClick={() => setIsOpen(false)}
              className="text-xs bg-medical-primary text-white px-3 py-1 rounded-md"
            >
              Manage
            </Link>
          </div>
        </div>
      </div>

      <div className="px-3">
        <div className="flex items-center gap-2 border-t pt-4 text-xs text-gray-500">
          <Link 
            to="/help" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1 hover:text-medical-primary"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
          <span className="text-gray-300">|</span>
          <Link 
            to="/settings" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1 hover:text-medical-primary"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-gray-200 bg-white z-20 overflow-y-auto hidden lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar (using Sheet from shadcn/ui) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-[280px] sm:w-[320px]">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-md bg-medical-primary flex items-center justify-center">
                  <span className="text-white font-bold">MP</span>
                </span>
                <span className="text-xl font-bold text-medical-dark">
                  MedProcure
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <SidebarContent />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
