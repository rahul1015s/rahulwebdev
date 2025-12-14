"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'minimal';
  location?: 'blog' | 'portfolio' | 'footer';
}

export default function NewsletterForm({ variant = 'default', location = 'portfolio' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: location,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setName('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection.');
    }
  };

  // Different variants
  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
            disabled={status === 'loading'}
          />
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        {status === 'error' && (
          <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
        )}
        {status === 'success' && (
          <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Subscribed successfully!
          </p>
        )}
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'loading'}
            className="flex-1"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
            className="flex-1"
          />
        </div>
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Mail className="w-4 h-4 mr-2" />
          )}
          Subscribe
        </Button>
        
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Subscribed successfully! Check your email to confirm.</span>
            </motion.div>
          )}
          
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    );
  }

  // Default variant
  return (
    <div className="bg-linear-to-r from-emerald-50/50 via-white to-cyan-50/50 dark:from-emerald-900/20 dark:via-gray-900/20 dark:to-cyan-900/20 rounded-2xl p-6 md:p-8 border border-emerald-200/50 dark:border-emerald-800/50">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-linear-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg">
              <Mail className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
              Newsletter
            </span>
          </div>
          
          <h3 className="text-2xl font-bold mb-3">
            Stay Updated <span className="text-emerald-600">✨</span>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Get weekly insights on web development, exclusive project updates, 
            and career tips delivered straight to your inbox.
          </p>
          
          <div className="flex flex-wrap gap-3 text-sm mb-6">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>Exclusive content</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3 w-full">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'loading'}
              className="w-full"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="w-full"
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Subscribe Now</span>
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>
          </form>
          
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Check your email to confirm your subscription! 🎉</span>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
          
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Join 500+ developers already subscribed
          </p>
        </div>
      </div>
    </div>
  );
}