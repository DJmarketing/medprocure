
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProductCategoryProps {
  category: {
    id: number;
    name: string;
    count: number;
    icon: LucideIcon;
  };
}

const ProductCategoryCard = ({ category }: ProductCategoryProps) => {
  return (
    <Link
      to={`/products?category=${category.name.toLowerCase()}`}
      className="group border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-medical-primary hover:shadow-sm transition-all"
    >
      <div className="h-12 w-12 rounded-full bg-medical-light flex items-center justify-center group-hover:bg-medical-primary/10 transition-colors">
        <category.icon className="h-6 w-6 text-medical-primary" />
      </div>
      <div className="text-center">
        <h4 className="font-medium">{category.name}</h4>
        <p className="text-xs text-muted-foreground">{category.count} products</p>
      </div>
    </Link>
  );
};

export default ProductCategoryCard;
