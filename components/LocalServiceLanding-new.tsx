"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MessageCircle,
  CheckCircle2,
  Stethoscope,
  BookOpen,
  ShoppingCart,
  Utensils,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Star,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  X,
  Menu,
  Award,
  Zap,
  Code2,
  Eye,
  Target,
  Lightbulb,
  Rocket,
  ExternalLink,
  AlertCircle,
  IndianRupee,
  ThumbsUp,
  Loader,
  DollarSign,
  Percent,
  Smartphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ================= DATA ================= */

const services = [
  {
    title: "Medical & Clinics",
    desc: "Appointment-focused websites for doctors & hospitals",
    icon: Stethoscope,
    features: ["Online Booking System", "Patient Portal", "Telemedicine Integration", "HIPAA Compliant"],
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Coaching & Education",
    desc: "Lead-driven sites for institutes & tutors",
    icon: BookOpen,
    features: ["LMS Integration", "Student Analytics", "Payment Processing", "Progress Tracking"],
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Retail & E-commerce",
    desc: "Sell products online with conversion optimization",
    icon: ShoppingCart,
    features: ["Inventory Sync", "Payment Gateway", "Order Analytics", "Shipping Integration"],
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Restaurants & Cafes",
    desc: "Menu, booking & WhatsApp ordering",
    icon: Utensils,
    features: ["Online Ordering", "Table Reservation", "Menu Analytics", "Delivery Integration"],
    color: "bg-orange-50 border-orange-200",
  },
]

// Real projects from portfolio
const projects = [
  {
    name: "OpluscWork - Coworking Platform",
    category: "SaaS / Booking System",
    description: "Complete coworking space platform with real-time booking, member management, and community features.",
    metrics: "50+ active members | 200+ monthly bookings",
    tech: ["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "🏢",
    url: "https://opluscowork.com",
  },
  {
    name: "SDRF India - NGO Website",
    category: "Corporate Website",
    description: "Professional nonprofit organization website with donation system, volunteer management, and impact tracking for disaster relief work.",
    metrics: "5000+ monthly visitors | 500+ active donors",
    tech: ["Next.js", "Tailwind CSS", "Stripe Integration", "Analytics"],
    image: "🤝",
    url: "https://sdrfindia.org",
  },
  {
    name: "PortfolioGenix - Portfolio Builder",
    category: "Web Application",
    description: "AI-powered portfolio and resume builder for developers. Create stunning portfolios without coding skills.",
    metrics: "500+ portfolios created | 4.8★ rating",
    tech: ["React", "Next.js", "Node.js", "Firebase", "Vercel"],
    image: "📱",
    url: "https://portfoliogenix.rahulwebdev.in/",
  },
]

const testimonials = [
  {
    name: "Rajesh Singh",
    business: "OpluscWork Founder, Patna",
    text: "Rahul built our coworking platform from scratch. The booking system works flawlessly, helped us get 50+ members in 3 months. Best investment for our startup!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    business: "Medical Clinic Owner, Bihar",
    text: "Got my clinic website made by Rahul for just ₹8,000. Now I get 10-15 appointment requests per week through it. Worth every rupee!",
    rating: 5,
  },
  {
    name: "Aman Gupta",
    business: "E-commerce Store Owner, Patna",
    text: "My sales increased from 0 to ₹50,000/month after the website. Payment integration & WhatsApp ordering feature was game-changing for our business!",
    rating: 5,
  },
]

const stats = [
  { label: "Websites Built", value: "15+", icon: Code2 },
  { label: "Happy Clients", value: "20+", icon: Users },
  { label: "Avg. Traffic Growth", value: "250%", icon: TrendingUp },
  { label: "Avg. Load Time", value: "1.2s", icon: Zap },
]

const process = [
  { step: "01", title: "Discovery", desc: "Understand your goals, audience, and market", icon: Eye },
  { step: "02", title: "Strategy", desc: "Develop a conversion-focused roadmap", icon: Lightbulb },
  { step: "03", title: "Design", desc: "Create mobile-first UI/UX prototypes", icon: Code2 },
  { step: "04", title: "Development", desc: "Build with performance & SEO in mind", icon: Rocket },
  { step: "05", title: "Testing", desc: "QA across devices and browsers", icon: Target },
  { step: "06", title: "Launch & Support", desc: "Deploy and provide 30+ days support", icon: Award },
]

const features = [
  { icon: Shield, title: "No Advance Payment" },
  { icon: TrendingUp, title: "SEO Optimized" },
  { icon: Users, title: "Mobile-First Design" },
  { icon: Clock, title: "7–10 Day Delivery" },
]

const painPoints = [
  {
    problem: "No Online Presence = Lost Customers",
    solution: "Website works 24/7 to attract & convert customers",
    loss: "Missing ₹50,000+ monthly revenue",
    icon: AlertCircle,
  },
  {
    problem: "Expensive Web Agencies (₹1+ Lakhs)",
    solution: "Affordable websites at ₹5,000 - ₹20,000 only",
    loss: "Overspending without guaranteed results",
    icon: DollarSign,
  },
  {
    problem: "No Online Bookings/Orders",
    solution: "WhatsApp & payment integration included",
    loss: "Manual order handling wastes 10+ hours/week",
    icon: Loader,
  },
  {
    problem: "Competitors Outranking You on Google",
    solution: "SEO-optimized from day 1 with analytics",
    loss: "Customers finding your competitors instead",
    icon: TrendingUp,
  },
]

const whyChooseUs = [
  { title: "Local Developer, Local Support", desc: "Direct WhatsApp support, understand Patna/Bihar business needs", icon: Phone },
  { title: "Zero Hidden Charges", desc: "Transparent pricing - ₹5-20K for complete website", icon: IndianRupee },
  { title: "Fast Results (7-10 Days)", desc: "Quick turnaround - get online before your competitor", icon: Zap },
  { title: "Result-Driven Design", desc: "Built to convert visitors into customers, not just look pretty", icon: Target },
  { title: "Free 30-Day Support", desc: "Unlimited revisions and support after launch", icon: ThumbsUp },
  { title: "100% Mobile Optimized", desc: "80% of your customers use mobile - we design for that", icon: Smartphone },
]

/* ================= COMPONENT ================= */

export function LocalServiceLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    message: "",
  })

  const WHATSAPP = "+919135271562"
  const EMAIL = "hello@rahulwebdev.in"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hi! I'm ${formData.name} from ${formData.business}. ${formData.message}`
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const navItems = ["Services", "Process", "Work", "Contact"]

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* ================= NAV ================= */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            RahulWebDev <Badge variant="secondary">Patna</Badge>
          </div>

          <div className="hidden md:flex gap-6 text-sm">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary">
                {item}
              </a>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden border-t px-4 py-4 space-y-3"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container max-w-5xl mx-auto px-4 py-24 md:py-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2 inline-flex">
              <Percent className="h-3 w-3" />
              Affordable Web Design • Fast Delivery
            </Badge>

            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter">
              Affordable Websites for 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary"> Patna Businesses</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get a professional website for ₹5,000–₹20,000 (not ₹1 lakh like big agencies). 
              Works 24/7 to turn visitors into customers. <strong>30 days free support included.</strong>
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2 h-14 px-8 text-base">
                    <MessageCircle className="h-5 w-5" />
                    Free Consultation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Your Free Consultation</DialogTitle>
                    <DialogDescription>
                      Let's discuss your business goals on WhatsApp.
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=Hi! I'd like to schedule a free consultation`,
                        "_blank"
                      )
                    }
                    className="w-full"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Open WhatsApp
                  </Button>
                </DialogContent>
              </Dialog>

              <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-base">
                See Our Work
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex flex-col items-center"
                >
                  <div className="p-3 rounded-lg bg-primary/10 mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Built for local businesses
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Designed for growth, not just looks
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className={cn("h-full border-2 transition-all hover:shadow-lg", s.color)}>
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{s.title}</CardTitle>
                    <CardDescription>{s.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {s.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO/REAL PROJECTS ================= */}
      <section id="work" className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Our Work
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Real Projects, Real Results
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Live websites driving growth for thriving businesses
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/20 mb-4">
                      <p className="text-xs text-muted-foreground">Key Metrics</p>
                      <p className="text-sm font-semibold text-primary">{project.metrics}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Tech Stack</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs bg-muted px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        View Live <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PAIN POINTS & SOLUTIONS ================= */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Why You Need a Website NOW
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              You're Losing Customers Every Day
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              See what your competition is getting while you wait
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-2 border-red-200 bg-red-50/50 hover:bg-red-50 transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-red-100">
                        <point.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-red-900">{point.problem}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border-t pt-3">
                      <p className="text-sm text-muted-foreground mb-2">✅ Solution:</p>
                      <p className="font-semibold text-green-700">{point.solution}</p>
                    </div>
                    <div className="bg-red-100 rounded p-3 border border-red-200">
                      <p className="text-xs text-muted-foreground">You're Missing Out:</p>
                      <p className="text-sm font-bold text-red-700">{point.loss}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="default" className="mb-4">
              Choose Wisely
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Why Patna & Bihar Trust Us
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Not a fancy agency. Just honest work at honest prices.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all border-primary/20 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="border-2 border-primary/30 bg-primary/5 p-8">
              <h3 className="text-2xl font-bold mb-2">Limited Slots Available This Month</h3>
              <p className="text-muted-foreground mb-6">Only 5 websites left • First 2 get ₹2,000 discount</p>
              <Button size="lg" className="gap-2 h-14 px-8 text-base" onClick={() => window.open(`https://wa.me/${WHATSAPP}`, "_blank")}>
                <MessageCircle className="h-5 w-5" />
                Claim Your Slot on WhatsApp
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Ready to Go Online?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start your free consultation on WhatsApp. No pressure. No hidden charges.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all">
                <p className="text-3xl font-bold text-primary mb-2">₹5,000</p>
                <p className="text-sm text-muted-foreground">Basic Website</p>
                <p className="text-xs mt-3 text-muted-foreground">Perfect for startups</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-6 rounded-lg border-2 border-primary bg-primary/5">
                <Badge className="mb-2">Most Popular</Badge>
                <p className="text-3xl font-bold text-primary mb-2">₹15,000</p>
                <p className="text-sm font-semibold">Business Website</p>
                <p className="text-xs mt-3 text-muted-foreground">+ WhatsApp Integration<br/>+ Payment Gateway</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all">
                <p className="text-3xl font-bold text-primary mb-2">₹20,000</p>
                <p className="text-sm text-muted-foreground">E-Commerce Store</p>
                <p className="text-xs mt-3 text-muted-foreground">Full online selling setup</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 space-y-4"
          >
            <Button size="lg" className="gap-2 h-14 px-8 text-base w-full sm:w-auto" onClick={() => window.open(`https://wa.me/${WHATSAPP}`, "_blank")}>
              <MessageCircle className="h-5 w-5" />
              Start Free Consultation on WhatsApp
            </Button>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="flex justify-center gap-2 items-center">
                <Phone className="h-4 w-4" /> +91 91352 71562
              </p>
              <p className="flex justify-center gap-2 items-center">
                <Mail className="h-4 w-4" /> {EMAIL}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-lg bg-blue-50 border border-blue-200 max-w-2xl mx-auto"
          >
            <h3 className="font-semibold text-blue-900 mb-3">💚 What's Included?</h3>
            <ul className="text-sm text-blue-800 space-y-2 text-left">
              <li>✅ Responsive design (mobile + desktop)</li>
              <li>✅ SEO optimization</li>
              <li>✅ Contact forms & WhatsApp integration</li>
              <li>✅ Google Analytics setup</li>
              <li>✅ 30 days free support & revisions</li>
              <li>✅ Hosting & SSL certificate (first 6 months free)</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Rahul Verma — Freelance Web Developer, Patna
      </footer>
    </main>
  )
}
