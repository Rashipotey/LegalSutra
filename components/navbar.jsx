import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { FileText, Upload, List, AlertTriangle, Home } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">LegalSutra</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link href="/upload" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Link>
          <Link href="/documents" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <List className="h-4 w-4" />
            <span>Documents</span>
          </Link>
          <Link href="/risk-score" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            <span>Risk Score</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  )
}

