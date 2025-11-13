import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav
      className={cn(
        "flex items-center justify-between w-full px-6 py-3 border-b bg-background"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/chattrix-logo.png" alt="logo" width={100} height={100} />
      </Link>
      <div className="flex items-center gap-4">
        {/* <Button variant="ghost" asChild>
          <Link href="/features">Features</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/pricing">Pricing</Link>
        </Button> */}
        <Button variant="ghost" asChild>
          <Link href="/contact">Contact</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/supporter">Support Us</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
