"use client"

import { useState, useEffect } from "react"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
  ChevronDown,
  MapPin,
  Globe,
  Cpu,
  Heart,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ================= ENHANCED DATA WITH IMAGES ================= */

const services = [
  {
    title: "Medical & Clinics",
    desc: "Appointment-focused websites for doctors & hospitals",
    icon: Stethoscope,
    features: ["Online Booking System", "Patient Portal", "Telemedicine Integration", "HIPAA Compliant"],
    color: "from-blue-50 to-white border-blue-200",
    image: "https://images.unsplash.com/photo-1516549655669-df0d4f7d7b44?w=800&auto=format&fit=crop",
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    title: "Coaching & Education",
    desc: "Lead-driven sites for institutes & tutors",
    icon: BookOpen,
    features: ["LMS Integration", "Student Analytics", "Payment Processing", "Progress Tracking"],
    color: "from-purple-50 to-white border-purple-200",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w-800&auto=format&fit=crop",
    gradient: "bg-gradient-to-br from-purple-50 to-purple-100",
  },
  {
    title: "Retail & E-commerce",
    desc: "Sell products online with conversion optimization",
    icon: ShoppingCart,
    features: ["Inventory Sync", "Payment Gateway", "Order Analytics", "Shipping Integration"],
    color: "from-green-50 to-white border-green-200",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w-800&auto=format&fit=crop",
    gradient: "bg-gradient-to-br from-green-50 to-green-100",
  },
  {
    title: "Restaurants & Cafes",
    desc: "Menu, booking & WhatsApp ordering",
    icon: Utensils,
    features: ["Online Ordering", "Table Reservation", "Menu Analytics", "Delivery Integration"],
    color: "from-orange-50 to-white border-orange-200",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w-800&auto=format&fit=crop",
    gradient: "bg-gradient-to-br from-orange-50 to-orange-100",
  },
]

// Enhanced projects with real images
const projects = [
  {
    name: "Oplus Cowork - Workspace Platform",
    category: "SaaS / Booking System",
    description: "Complete coworking space platform with real-time booking, member management, and community features.",
    metrics: "50+ active members | 200+ monthly bookings",
    tech: ["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop",
    url: "https://opluscowork.com",
    featured: true,
  },
  {
    name: "SDRF India - NGO Platform",
    category: "Corporate Website",
    description: "Professional nonprofit organization website with donation system, volunteer management, and impact tracking for disaster relief work.",
    metrics: "5000+ monthly visitors | 500+ active donors",
    tech: ["Next.js", "Tailwind CSS", "Stripe Integration", "Analytics"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop",
    url: "https://sdrfindia.org",
    featured: true,
  },
  {
    name: "PortfolioGenix - Portfolio Builder",
    category: "Web Application",
    description: "AI-powered portfolio and resume builder for developers. Create stunning portfolios without coding skills.",
    metrics: "500+ portfolios created | 4.8★ rating",
    tech: ["React", "Next.js", "Node.js", "Firebase", "Vercel"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&auto=format&fit=crop",
    url: "https://portfoliogenix.rahulwebdev.in/",
    featured: true,
  },
]

const testimonials = [
  {
    name: "Rajesh Singh",
    business: "Oplus Cowork Founder, Patna",
    text: "Rahul built our coworking platform from scratch. The booking system works flawlessly, helped us get 50+ members in 3 months. Best investment for our startup!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    location: "Patna, Bihar"
  },
  {
    name: "Priya Sharma",
    business: "Medical Clinic Owner, Bihar",
    text: "Got my clinic website made by Rahul for just ₹8,000. Now I get 10-15 appointment requests per week through it. Worth every rupee!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop&q=80",
    location: "Patna, Bihar"
  },
  {
    name: "Aman Gupta",
    business: "E-commerce Store Owner, Patna",
    text: "My sales increased from 0 to ₹50,000/month after the website. Payment integration & WhatsApp ordering feature was game-changing for our business!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    location: "Patna, Bihar"
  },
]

const stats = [
  { label: "Websites Built", value: "15+", icon: Code2, suffix: "Projects" },
  { label: "Happy Clients", value: "20+", icon: Users, suffix: "Businesses" },
  { label: "Avg. Traffic Growth", value: "250%", icon: TrendingUp, suffix: "Increase" },
  { label: "Avg. Load Time", value: "1.2s", icon: Zap, suffix: "Fast" },
]

const process = [
  { step: "01", title: "Discovery", desc: "Understand your goals, audience, and market", icon: Eye, color: "bg-blue-100 text-blue-700" },
  { step: "02", title: "Strategy", desc: "Develop a conversion-focused roadmap", icon: Lightbulb, color: "bg-purple-100 text-purple-700" },
  { step: "03", title: "Design", desc: "Create mobile-first UI/UX prototypes", icon: Code2, color: "bg-green-100 text-green-700" },
  { step: "04", title: "Development", desc: "Build with performance & SEO in mind", icon: Rocket, color: "bg-orange-100 text-orange-700" },
  { step: "05", title: "Testing", desc: "QA across devices and browsers", icon: Target, color: "bg-red-100 text-red-700" },
  { step: "06", title: "Launch & Support", desc: "Deploy and provide 30+ days support", icon: Award, color: "bg-indigo-100 text-indigo-700" },
]

const painPoints = [
  {
    problem: "No Online Presence = Lost Customers",
    solution: "Website works 24/7 to attract & convert customers",
    loss: "Missing ₹50,000+ monthly revenue",
    icon: AlertCircle,
    color: "bg-red-50 border-red-200",
  },
  {
    problem: "Expensive Web Agencies (₹1+ Lakhs)",
    solution: "Affordable websites at ₹5,000 - ₹20,000 only",
    loss: "Overspending without guaranteed results",
    icon: DollarSign,
    color: "bg-amber-50 border-amber-200",
  },
  {
    problem: "No Online Bookings/Orders",
    solution: "WhatsApp & payment integration included",
    loss: "Manual order handling wastes 10+ hours/week",
    icon: Loader,
    color: "bg-blue-50 border-blue-200",
  },
  {
    problem: "Competitors Outranking You on Google",
    solution: "SEO-optimized from day 1 with analytics",
    loss: "Customers finding your competitors instead",
    icon: TrendingUp,
    color: "bg-green-50 border-green-200",
  },
]

const whyChooseUs = [
  { 
    title: "Local Developer, Local Support", 
    desc: "Direct WhatsApp support, understand Patna/Bihar business needs", 
    icon: Phone,
    highlight: true 
  },
  { 
    title: "Zero Hidden Charges", 
    desc: "Transparent pricing - ₹5-20K for complete website", 
    icon: IndianRupee 
  },
  { 
    title: "Fast Results (7-10 Days)", 
    desc: "Quick turnaround - get online before your competitor", 
    icon: Zap 
  },
  { 
    title: "Result-Driven Design", 
    desc: "Built to convert visitors into customers, not just look pretty", 
    icon: Target 
  },
  { 
    title: "Free 30-Day Support", 
    desc: "Unlimited revisions and support after launch", 
    icon: ThumbsUp 
  },
  { 
    title: "100% Mobile Optimized", 
    desc: "80% of your customers use mobile - we design for that", 
    icon: Smartphone 
  },
]

/* ================= ENHANCED COMPONENT ================= */

export function LocalServiceLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("services")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    message: "",
  })
  const [scrolled, setScrolled] = useState(false)

  const WHATSAPP = "+919135271562"
  const EMAIL = "hello@rahulwebdev.in"

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const navItems = [
    { label: "Services", icon: Code2 },
    { label: "Process", icon: Rocket },
    { label: "Work", icon: Award },
    { label: "Contact", icon: MessageCircle }
  ]

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* ================= ENHANCED HERO SECTION ================= */}
      <section className="relative min-h-screen sm:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container max-w-6xl mx-auto px-3 sm:px-4 py-12 sm:py-16 relative">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <Badge 
                variant="secondary" 
                className="mb-4 sm:mb-6 gap-2 px-3 sm:px-4 py-1.5 sm:py-2 inline-flex animate-fade-in text-xs sm:text-sm"
              >
                <Percent className="h-3 w-3" />
                Affordable Web Design • Fast Delivery
              </Badge>

              <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-6xl font-bold tracking-tighter leading-tight">
                Professional Websites for 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient">
                  {" "}Patna Businesses
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Get a high-quality website for ₹5,000–₹20,000 — <strong>not ₹1 lakh like big agencies</strong>. 
                Built to work 24/7 turning visitors into customers. 
                <span className="block mt-2 text-primary font-semibold">30 days free support included.</span>
              </p>

              {/* CTA Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="gap-3 h-14 px-8 text-base w-full sm:w-auto">
                        <MessageCircle className="h-5 w-5" />
                        Get Free Consultation
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule Your Free Consultation</DialogTitle>
                      <DialogDescription>
                        Let's discuss your business goals on WhatsApp. No commitment required.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="John Sharma" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">WhatsApp Number</Label>
                        <Input id="phone" placeholder="+91 98765 43210" />
                      </div>
                      <Button 
                        onClick={() =>
                          window.open(
                            `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=Hi! I'd like to schedule a free consultation`,
                            "_blank"
                          )
                        }
                        className="w-full gap-2"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Open WhatsApp Now
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-3 h-14 px-8 text-base w-full sm:w-auto"
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Our Work
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>

              {/* Stats Grid - Mobile Optimized */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16 grid grid-cols-2 gap-4"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-white to-muted/30 p-4 rounded-xl border shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Image/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white to-muted/50 p-8 rounded-2xl border shadow-2xl">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🚀</div>
                        <p className="text-lg font-semibold">Your Business Website</p>
                        <p className="text-sm text-muted-foreground">Ready in 7-10 Days</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Starting From</span>
                      <span className="text-3xl font-bold text-primary">₹5,000</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-full"></div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Basic Website</span>
                      <span>Premium E-commerce</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-4 -right-4 bg-white p-3 rounded-xl border shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-semibold">Mobile First</span>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl border shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-semibold">Fast Loading</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= ENHANCED SERVICES ================= */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <Code2 className="h-3 w-3 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Built Specifically for 
              <span className="text-primary"> Local Businesses</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Websites designed to drive growth and conversions, not just look pretty
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className={cn(
                  "h-full border-2 overflow-hidden group hover:shadow-xl transition-all duration-300",
                  s.color
                )}>
                  <div className={`h-32 ${s.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: `url(${s.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }} />
                    </div>
                    <div className="absolute top-4 left-4 w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <s.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{s.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{s.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-3">
                      {s.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-center text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full gap-2 group-hover:text-primary"
                      onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=I'm interested in ${s.title} website`, "_blank")}
                    >
                      Get Quote
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Service Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 sm:p-8 border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {whyChooseUs.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{feature.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ENHANCED PORTFOLIO ================= */}
      <section id="work" className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <Award className="h-3 w-3 mr-2" />
              Our Portfolio
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Real Projects, 
              <span className="text-primary"> Real Results</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Live websites driving tangible growth for thriving businesses across Patna and beyond
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="all" className="gap-2">
                <Globe className="h-4 w-4" />
                All Work
              </TabsTrigger>
              <TabsTrigger value="saas" className="gap-2">
                <Cpu className="h-4 w-4" />
                SaaS
              </TabsTrigger>
              <TabsTrigger value="business" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Business
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/80">
                            {project.category}
                          </Badge>
                        </div>
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="text-xs gap-1 bg-primary">
                              <Star className="h-3 w-3" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl line-clamp-1">{project.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                          {project.description}
                        </p>
                        <div className="space-y-4">
                          <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                            <p className="text-xs text-muted-foreground mb-1">Key Metrics</p>
                            <p className="text-sm font-semibold text-primary">{project.metrics}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech) => (
                                <span 
                                  key={tech} 
                                  className="text-xs bg-muted px-3 py-1.5 rounded-full border"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4">
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button variant="outline" className="w-full gap-2 group-hover:border-primary">
                            View Live Project
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section id="process" className="py-20 bg-gradient-to-b from-background to-muted/10">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <Rocket className="h-3 w-3 mr-2" />
              Our Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Simple & Transparent 
              <span className="text-primary"> Workflow</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              From idea to launch in 7-10 days with clear communication at every step
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line - Hidden on mobile, visible on md+ */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-blue-500 to-primary hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0">
              {process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative md:flex md:items-center md:gap-12 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Step Content */}
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <Card className="border-2 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                            <step.icon className="h-7 w-7" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                Step {step.step}
                              </Badge>
                              <CardTitle className="text-xl">{step.title}</CardTitle>
                            </div>
                            <CardDescription>{step.desc}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Step Number on Timeline */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                      <span className="font-bold text-primary">{step.step}</span>
                    </div>
                  </div>

                  {/* Empty div for spacing on alternating sides */}
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ENHANCED PAIN POINTS ================= */}
      <section className="py-20 bg-gradient-to-b from-background to-red-50/20">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <AlertCircle className="h-3 w-3 mr-2" />
              Wake Up Call
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Your Competitors Are 
              <span className="text-red-600"> Winning Online</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Don't let these common mistakes cost you customers and revenue
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={cn("h-full border-2 transition-all", point.color)}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-red-100 flex-shrink-0">
                        <point.icon className="h-7 w-7 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-red-900 mb-2">
                          {point.problem}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          <span className="text-red-600 font-medium">You're Losing Money</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Our Solution</span>
                      </div>
                      <p className="font-semibold text-green-800">{point.solution}</p>
                    </div>
                    <div className="bg-red-50/80 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-red-600 mb-1">Monthly Loss</p>
                          <p className="text-lg font-bold text-red-700">{point.loss}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-red-600">Time Wasted</p>
                          <p className="text-sm font-semibold text-red-700">10+ hours/week</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=I need help with: ${point.problem}`, "_blank")}
                    >
                      Fix This Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ENHANCED WHY CHOOSE US ================= */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-1 bg-primary hover:bg-primary/90">
              <Shield className="h-3 w-3 mr-2" />
              Local Advantage
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Why Patna Businesses 
              <span className="text-primary"> Choose Us</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Not a fancy agency from another city. Just honest, local work at honest prices
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <Card className={cn(
                  "h-full transition-all duration-300 hover:border-primary/50",
                  item.highlight ? "border-primary/30 bg-gradient-to-br from-primary/5 to-white" : ""
                )}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-xl flex-shrink-0",
                        item.highlight 
                          ? "bg-primary/20 border border-primary/30" 
                          : "bg-primary/10"
                      )}>
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-sm">{item.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {item.highlight && (
                    <CardFooter>
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        Local Patna Advantage
                      </Badge>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-white overflow-hidden">
              <div className="p-8 sm:p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Limited Slots Available This Month
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Only 5 websites left • First 2 clients get <strong>₹2,000 discount</strong> • 
                  Book your slot before competitors do
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="gap-3 h-14 px-8 text-base"
                      onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=I want to claim the ₹2,000 discount for website`, "_blank")}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Claim Your Discount Now
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-3 h-14 px-8 text-base"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Phone className="h-5 w-5" />
                      Call Now: +91 91352 71562
                    </Button>
                  </motion.div>
                </div>
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      No Advance Payment
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      30-Day Free Support
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Money Back Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ================= ENHANCED TESTIMONIALS ================= */}
      <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <Heart className="h-3 w-3 mr-2" />
              Client Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Trusted by 
              <span className="text-primary"> Patna Entrepreneurs</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Real feedback from local business owners who've seen real results
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${testimonial.image})` }}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {testimonial.business}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ENHANCED CONTACT ================= */}
      <section id="contact" className="py-20 sm:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container max-w-4xl mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-1 bg-primary hover:bg-primary/90">
              <MessageCircle className="h-3 w-3 mr-2" />
              Let's Connect
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Grow Your 
              <span className="text-primary"> Business Online?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Free consultation • No advance payment • 7-10 day delivery • 30 days free support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border shadow-lg p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Your Requirements</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Rajesh Kumar"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business">Business Name & Type</Label>
                  <Input
                    id="business"
                    placeholder="e.g., Sharma Medical Clinic"
                    value={formData.business}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">What do you need?</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your website requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full gap-2 h-12">
                  <MessageCircle className="h-5 w-5" />
                  Send on WhatsApp for Instant Reply
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-4">Direct Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                    onClick={() => window.open(`https://wa.me/${WHATSAPP}`, "_blank")}
                  >
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-muted-foreground">Instant reply within minutes</p>
                      <p className="text-lg font-bold text-primary mt-1">+91 91352 71562</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                    onClick={() => window.open(`mailto:${EMAIL}`, "_blank")}
                  >
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">For detailed proposals</p>
                      <p className="text-lg font-bold text-blue-600 mt-1">{EMAIL}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
                    onClick={() => window.open(`tel:+919135271562`, "_blank")}
                  >
                    <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Call Direct</p>
                      <p className="text-muted-foreground">Mon-Sat, 10AM-7PM</p>
                      <p className="text-lg font-bold text-orange-600 mt-1">+91 91352 71562</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Why Contact Us Today?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Free website audit & consultation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Custom quote within 1 hour</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">No commitment required</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Start development within 24 hours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= ENHANCED FOOTER ================= */}
      <footer className="border-t bg-gradient-to-b from-background to-muted/20 py-8">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <p className="font-bold text-lg">RahulWebDev</p>
                <p className="text-sm text-muted-foreground">Freelance Web Developer, Patna</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="https://wa.me/919135271562" 
                target="_blank" 
                className="hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
              <a 
                href="mailto:hello@rahulwebdev.in" 
                className="hover:text-primary transition-colors"
              >
                Email
              </a>
              <a 
                href="https://rahulwebdev.in" 
                target="_blank" 
                className="hover:text-primary transition-colors"
              >
                Portfolio
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Rahul Verma — Professional Web Services for Patna & Bihar Businesses</p>
            <p className="mt-2 text-xs">Specializing in affordable, high-conversion websites for local entrepreneurs</p>
          </div>
        </div>
      </footer>
    </main>
  )
}