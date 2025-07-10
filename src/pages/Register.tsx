
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthProvider';
import { Loader2, BarChart3 } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Lozinke se ne podudaraju');
      return;
    }

    if (password.length < 6) {
      setError('Lozinka mora imati najmanje 6 znakova');
      return;
    }

    if (!acceptTerms) {
      setError('Morate prihvatiti uvjete korištenja');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (!error) {
      navigate('/login');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">PostPilot</span>
          </Link>
          <h1 className="text-2xl font-bold">Stvorite račun</h1>
          <p className="text-muted-foreground mt-2">
            Registrirajte se i počnite koristiti PostPilot besplatno
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registracija</CardTitle>
            <CardDescription>
              Unesite svoje podatke za stvaranje novog računa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Ime i prezime</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Vaše ime i prezime"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Lozinka</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Potvrdite lozinku</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm">
                  Prihvaćam{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    uvjete korištenja
                  </Link>{' '}
                  i{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    pravila privatnosti
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Stvori račun
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Već imate račun?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Prijavite se
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
