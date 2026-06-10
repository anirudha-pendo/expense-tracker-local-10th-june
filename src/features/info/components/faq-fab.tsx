import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FaqFab() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/product-wiki")}
      size="icon"
      className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Product Wiki"
      title="Ledger Product Wiki"
    >
      <HelpCircle className="size-5" />
    </Button>
  );
}
