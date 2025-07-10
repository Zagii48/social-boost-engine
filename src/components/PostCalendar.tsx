import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Plus, Clock, CheckCircle, XCircle, Instagram, Facebook, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  scheduledFor: Date;
  platforms: string[];
  status: 'scheduled' | 'published' | 'failed';
}

interface PostCalendarProps {
  posts: Post[];
  userPlan: string;
}

export function PostCalendar({ posts, userPlan }: PostCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-3 h-3" />;
      case 'facebook':
        return <Facebook className="w-3 h-3" />;
      case 'tiktok':
        return <div className="w-3 h-3 bg-current rounded-sm" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-3 h-3 text-blue-500" />;
      case 'published':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'failed':
        return <XCircle className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  const hasPostsOnDate = (date: Date) => {
    return getPostsForDate(date).length > 0;
  };

  const selectedDatePosts = selectedDate ? getPostsForDate(selectedDate) : [];

  const canCreatePost = () => {
    if (userPlan === 'free') {
      const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
      return scheduledCount < 1;
    }
    return true;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Kalendar objava</CardTitle>
              <CardDescription>
                Kliknite na datum da vidite zakazane objave
              </CardDescription>
            </div>
            {canCreatePost() ? (
              <Button asChild size="sm">
                <Link to="/new-post">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova objava
                </Link>
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Lock className="mr-2 h-4 w-4" />
                    Nova objava
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nadogradite svoj plan</DialogTitle>
                    <DialogDescription>
                      Free plan omogućuje samo 1 zakazanu objavu. Nadogradite na Pro ili Premium za više objava.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 pt-4">
                    <Button asChild>
                      <Link to="/pricing">Pogledaj planove</Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasPosts: (date) => hasPostsOnDate(date)
            }}
            modifiersStyles={{
              hasPosts: { 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'hsl(var(--primary-foreground))',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Selected Date Posts */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? 
              `Objave za ${selectedDate.toLocaleDateString('hr-HR')}` : 
              'Odaberite datum'
            }
          </CardTitle>
          <CardDescription>
            {selectedDatePosts.length} objava zakazano
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDatePosts.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Nema objava za ovaj datum
              </p>
              {canCreatePost() && (
                <Button size="sm" className="mt-2" asChild>
                  <Link to="/new-post">
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj objavu
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDatePosts.map((post) => (
                <Dialog key={post.id}>
                  <DialogTrigger asChild>
                    <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{post.title}</h4>
                        {getStatusIcon(post.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {post.scheduledFor.toLocaleTimeString('hr-HR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <div className="flex gap-1">
                          {post.platforms.map((platform) => (
                            <div key={platform} className="text-muted-foreground">
                              {getPlatformIcon(platform)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{post.title}</DialogTitle>
                      <DialogDescription>
                        Zakazano za {post.scheduledFor.toLocaleString('hr-HR')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Sadržaj:</h4>
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Platforme:</h4>
                        <div className="flex gap-2">
                          {post.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="flex items-center gap-1">
                              {getPlatformIcon(platform)}
                              <span className="capitalize">{platform}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Status:</h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(post.status)}
                          <span className="text-sm capitalize">{post.status}</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}