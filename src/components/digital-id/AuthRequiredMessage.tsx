import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AuthRequiredMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-semibold mb-4">
        Authentication Required
      </h2>
      <p className="text-muted-foreground mb-6">
        Please log in to access your Digital ID
      </p>
      <Button asChild>
        <Link to="/login" className="flex items-center">
          Login <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export { AuthRequiredMessage };
