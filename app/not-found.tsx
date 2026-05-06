import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-earth-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-forest-600 mb-4">404</h1>
        <h2 className="text-3xl font-serif font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button size="lg" className="bg-forest-600 hover:bg-forest-700">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
