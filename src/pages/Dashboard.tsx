
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthProvider';
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Instagram, 
  Facebook,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Promocija novih proizvoda',
      content: 'Otkrijte našu novu kolekciju proizvoda s popustom od 20%!',
      scheduledFor: new Date('2024-12-20T10:00:00'),
      platforms: ['instagram', 'facebook'],
      status: 'scheduled',
      imageUrl: null
    },
    {
      id: '2',
      title: 'Savjeti za uspjeh',
      content: '5 savjeta za uspješno poslovanje u 2024. godini',
      scheduledFor: new Date('2024-12-18T15:30:00'),
      platforms: ['instagram', 'facebook', 'tiktok'],
      status: 'published',
      imageUrl: null
    },
    {
      id: '3',
      title: 'Pozadina kompanije',
      content: 'Priča o tome kako je nastala naša kompanija...',
      scheduledFor: new Date('2024-12-15T12:00:00'),
      platforms: ['facebook'],
      status: 'failed',
      imageUrl: null
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><Clock className="w-3 h-3 mr-1" />Zakazano</Badge>;
      case 'published':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Objavljeno</Badge>;
      case 'failed':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Greška</Badge>;
      default:
        return <Badge variant="outline">Nepoznato</Badge>;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'tiktok':
        return <div className="w-4 h-4 bg-current rounded-sm" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const scheduledPosts = posts.filter(p => p.status === 'scheduled').length;
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const failedPosts = posts.filter(p => p.status === 'failed').length;

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Dobrodošli natrag, {user?.email}! Evo pregleda vaših objava.
          </p>
        </div>
        <Button asChild>
          <Link to="/new-post">
            <Plus className="mr-2 h-4 w-4" />
            Nova objava
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zakazane objave</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledPosts}</div>
            <p className="text-xs text-muted-foreground">
              objava čeka na objavu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objavljene objave</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts}</div>
            <p className="text-xs text-muted-foreground">
              uspješno objavljenih
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Neuspješne objave</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedPosts}</div>
            <p className="text-xs text-muted-foreground">
              objava s greškom
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ukupno objava</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">
              svih objava
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Vaše objave</CardTitle>
          <CardDescription>
            Pregled svih vaših objava s mogućnostima upravljanja
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nema objava</h3>
              <p className="text-muted-foreground mb-4">
                Još niste stvorili nijednu objavu. Počnite sada!
              </p>
              <Button asChild>
                <Link to="/new-post">
                  <Plus className="mr-2 h-4 w-4" />
                  Stvori prvu objavu
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      {getStatusBadge(post.status)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.scheduledFor)}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {post.platforms.map((platform) => (
                          <div key={platform} className="flex items-center gap-1">
                            {getPlatformIcon(platform)}
                            <span className="capitalize">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Pregled
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Uredi
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Obriši
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fixed CTA for mobile */}
      <div className="fixed bottom-4 right-4 sm:hidden">
        <Button size="lg" className="rounded-full shadow-lg" asChild>
          <Link to="/new-post">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
