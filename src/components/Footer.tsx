
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AutoSMM</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Automatizacija društvenih mreža za male poduzetnike i freelancere.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Proizvod</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Cjenovnik</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Podrška</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Pomoć</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Kontakt</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Pravni</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privatnost</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Uvjeti</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 AutoSMM. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
}
