
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';

export default function Pricing() {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '0',
      period: 'mjesečno',
      description: 'Savršeno za početak',
      features: [
        '5 objava mjesečno',
        'Osnovni AI sadržaj',
        'Instagram i Facebook',
        'Email podrška',
        'Osnovna analitika'
      ],
      recommended: false,
      buttonText: 'Počnite besplatno',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Pro',
      price: '29',
      period: 'mjesečno',
      description: 'Za rastući biznis',
      features: [
        '50 objava mjesečno',
        'Napredni AI sadržaj',
        'Sve društvene mreže',
        'Prioritetna podrška',
        'Detaljana analitika',
        'Automatsko zakazivanje',
        'Brand personalizacija'
      ],
      recommended: true,
      buttonText: 'Odaberite Pro',
      buttonVariant: 'default' as const
    },
    {
      name: 'Premium',
      price: '79',
      period: 'mjesečno',
      description: 'Za agencije i timove',
      features: [
        'Neograničene objave',
        'Premium AI sadržaj',
        'Sve društvene mreže',
        '24/7 prioritetna podrška',
        'Napredna analitika',
        'White-label opcija',
        'API pristup',
        'Timska kolaboracija',
        'Prilagođeni izvještaji'
      ],
      recommended: false,
      buttonText: 'Odaberite Premium',
      buttonVariant: 'outline' as const
    }
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'AI generacija sadržaja',
      description: 'Automatska generacija privlačnog teksta i slika pomoću napredne AI tehnologije'
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Automatsko zakazivanje',
      description: 'Postavite jednom i zaboravite - vaše objave će se automatski objavljivati'
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: 'Multi-platforma podrška',
      description: 'Objavljujte na Instagram, Facebook, TikTok i drugim mrežama odjednom'
    }
  ];

  const faqs = [
    {
      question: 'Mogu li promijeniti plan u bilo kojem trenutku?',
      answer: 'Da, možete nadograditi ili degradirati svoj plan u bilo kojem trenutku. Promjene će se odnositi na sljedeći obračunski ciklus.'
    },
    {
      question: 'Što se događa ako premaším broj objava?',
      answer: 'Ako premaših broj objava u vašem planu, jednostavno možete nadograditi na viši plan ili pričekati sljedeći mjesec.'
    },
    {
      question: 'Postoji li ugovor?',
      answer: 'Ne, nema ugovora. Možete otkazati svoju pretplatu u bilo kojem trenutku bez dodatnih troškova.'
    },
    {
      question: 'Kakva je podrška dostupna?',
      answer: 'Svi planovi uključuju email podršku. Pro i Premium korisnici imaju prioritetnu podršku, a Premium korisnici dodatno imaju 24/7 podršku.'
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="container px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            💰 14 dana besplatno za sve planove
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Odaberite plan koji odgovara vašem poslovanju
          </h1>
          <p className="text-xl text-muted-foreground">
            Počnite besplatno i nadogradite kada ste spremni. 
            Svi planovi uključuju osnovne funkcionalnosti za automatizaciju društvenih mreža.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.recommended ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Najpopularniji
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.buttonVariant}
                  size="lg"
                  asChild
                >
                  <Link to={user ? "/dashboard" : "/register"}>
                    {plan.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Što čini AutoSMM posebnim?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Naše napredne funkcionalnosti čine upravljanje društvenim mrežama jednostavnim i efikasnim
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Često postavljana pitanja</h2>
            <p className="text-muted-foreground">
              Imate pitanja? Imamo odgovore.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Spremni da počnete?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Pridružite se tisućama zadovoljnih korisnika koji već koriste AutoSMM 
            za automatizaciju svojih društvenih mreža
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Počnite besplatno
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">
                Kontaktirajte nas
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
