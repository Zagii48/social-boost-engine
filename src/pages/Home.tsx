
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthProvider';
import { 
  Calendar, 
  Zap, 
  Brain, 
  Instagram, 
  Facebook, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Zakazivanje objava',
      description: 'Zakazivanje objava unaprijed za sve popularne društvene mreže.'
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'AI generacija sadržaja',
      description: 'Automatska generacija privlačnog teksta i slika pomoću umjetne inteligencije.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Automatizacija',
      description: 'Potpuna automatizacija objava bez potrebe za stalnom kontrolom.'
    }
  ];

  const socialPlatforms = [
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" /> },
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
    { name: 'TikTok', icon: <div className="h-5 w-5 bg-current rounded-sm" /> }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      description: 'Za početnike',
      features: ['5 objava mjesečno', 'Osnovni AI sadržaj', 'Email podrška'],
      recommended: false
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Za male poduzetnike',
      features: ['50 objava mjesečno', 'Napredni AI sadržaj', 'Prioritetna podrška', 'Analitika'],
      recommended: true
    },
    {
      name: 'Premium',
      price: '79',
      description: 'Za agencije',
      features: ['Neograničene objave', 'Premium AI sadržaj', '24/7 podrška', 'White-label'],
      recommended: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3 py-1">
                🚀 Novo: AI automatizacija objava
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Automatizacija društvenih mreža
                <br />
                <span className="text-primary">bez marketing znanja</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Kreiranje i zakazivanje profesionalnih objava za Instagram, Facebook i TikTok 
                pomoću AI tehnologije. Idealno za male poduzetnike i freelancere.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Idite na Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to="/register">
                      Počnite besplatno
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/pricing">Pogledajte cjene</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Bez ugovora
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                14 dana besplatno
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Otkazivanje u bilo kojem trenutku
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Podržane platforme</h2>
            <p className="text-muted-foreground">Objavite na svim važnim društvenim mrežama odjednom</p>
          </div>
          <div className="flex justify-center items-center gap-8">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center gap-2 text-lg font-medium">
                {platform.icon}
                {platform.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Zašto PostPilot?</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Napredne funkcionalnosti koje čine upravljanje društvenim mrežama jednostavnim i efikasnim
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Kako funkcionira</h2>
            <p className="text-muted-foreground">Jednostavan proces u tri koraka</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold mb-2">Kreirajte sadržaj</h3>
              <p className="text-muted-foreground text-sm">
                Koristite AI za generiranje privlačnog teksta i slika ili uploadajte vlastiti sadržaj
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold mb-2">Zakazivanje objava</h3>
              <p className="text-muted-foreground text-sm">
                Odaberite datum, vrijeme i platforme na kojima želite objaviti sadržaj
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold mb-2">Automatska objava</h3>
              <p className="text-muted-foreground text-sm">
                Vaš sadržaj se automatski objavljuje u zakazano vrijeme na svim odabranim platformama
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Odaberite svoj plan</h2>
            <p className="text-muted-foreground">Počnite besplatno, nadogradite kada ste spremni</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.recommended ? 'border-primary shadow-lg' : ''}`}>
                {plan.recommended && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Preporučeno
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/mjesečno</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.recommended ? 'default' : 'outline'} asChild>
                    <Link to="/register">Odaberite {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Što kažu naši korisnici</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "PostPilot mi je omogućio da se fokusiram na svoj posao dok se moje društvene mreže 
                  automatski ažuriraju kvalitetnim sadržajem."
                </p>
                <div className="font-semibold text-sm">Ana Marić</div>
                <div className="text-xs text-muted-foreground">Freelancer dizajner</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "Kao vlasnik male trgovine, PostPilot mi štedi sate vremena tjedno. 
                  AI generacija sadržaja je fantastična!"
                </p>
                <div className="font-semibold text-sm">Marko Horvat</div>
                <div className="text-xs text-muted-foreground">Vlasnik trgovine</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "Jednostavno za korištenje, jeftino i efikasno. Preporučujem svim poduzetnicima 
                  koji žele profesionalnu prisutnost na društvenim mrežama."
                </p>
                <div className="font-semibold text-sm">Petra Novak</div>
                <div className="text-xs text-muted-foreground">Kozmetičarka</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Spremni za automatizaciju vaših društvenih mreža?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Pridružite se tisućama zadovoljnih korisnika koji već koriste PostPilot
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Počnite besplatno danas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
