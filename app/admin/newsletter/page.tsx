"use client";

import { useState } from 'react';
import { Send, Loader2, FileText, Eye, EyeOff, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { newsletterTemplates, getAllCategories } from '@/lib/newsletter-templates';
import api from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api-error';

export default function NewsletterAdmin() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('none');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const categories = getAllCategories();

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === 'none') {
      setSelectedTemplate('none');
      setSubject('');
      setContent('');
    } else {
      const template = newsletterTemplates.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(templateId);
        setSubject(template.subject);
        setContent(template.content);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !content) {
      setStatus('error');
      setMessage('Subject and content are required');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await api.post('/api/newsletter/send', { subject, content }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-token'}`
        }
      });
      const data = response.data;

      if (data?.error) {
        setStatus('error');
        setMessage(data.error || 'Failed to send newsletter');
      } else {
        setStatus('success');
        setMessage(`Newsletter sent to ${data.stats.sent} subscribers`);
        setSubject('');
        setContent('');
      }
    } catch (error) {
      setStatus('error');
      setMessage(getApiErrorMessage(error, 'Network error. Please try again.'));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Newsletter Management</h1>
          <p className="text-muted-foreground">Send newsletters to your subscribers.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2"
        >
          {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {previewMode ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Newsletters Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">Average open rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send Newsletter</CardTitle>
          <CardDescription>
            Compose and send a newsletter to all subscribers. Use templates to get started quickly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Newsletter Template</label>
              <Select onValueChange={handleTemplateSelect} value={selectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template or start from scratch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Start from scratch</SelectItem>
                  {categories.map(category => (
                    <SelectGroup key={category}>
                      <SelectLabel>{category}</SelectLabel>
                      {newsletterTemplates
                        .filter(template => template.category === category)
                        .map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Select a template to pre-fill the subject and content fields
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject Line</label>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Weekly Update: New React Features"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Content {previewMode ? '(Preview)' : '(HTML)'}
              </label>
              {previewMode ? (
                <div
                  className="min-h-[400px] p-4 border rounded-lg bg-white prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="<h2>This Week's Highlights</h2><p>Check out the new React features...</p>"
                  rows={15}
                  required
                  className="font-mono text-sm"
                />
              )}
              <p className="text-sm text-muted-foreground mt-2">
                {previewMode
                  ? 'This is how your newsletter will look to subscribers'
                  : 'Use HTML format. You can include images, links, and basic styling.'
                }
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={status === 'loading' || previewMode}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Send Newsletter
              </Button>

              {selectedTemplate && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleTemplateSelect(selectedTemplate)}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Reset Template
                </Button>
              )}
            </div>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg ${
              status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
