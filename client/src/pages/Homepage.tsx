import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  FileText,
  Wrench,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Star,
  Shield,
  Smartphone,
  MessageSquare,
  Mail,
} from "lucide-react";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simplify Property Management
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              RentFlow helps landlords and tenants manage properties, payments,
              and maintenance - all in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/signup">
                <Button size="lg">
                  Get Started <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <a href="#features">
                <Button variant="outline" size="lg">
                  Learn More <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-8">
            TRUSTED BY PROPERTY OWNERS ACROSS THE COUNTRY
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              "Acme Properties",
              "Urban Living",
              "Golden Key",
              "SafeHaven",
              "Elite Estates",
            ].map((company) => (
              <div key={company} className="text-lg font-medium text-gray-700">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to manage your rental properties efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-8 w-8 text-primary" />,
                title: "Lease Management",
                description:
                  "Create, sign, and store leases digitally with tenants",
              },
              {
                icon: <DollarSign className="h-8 w-8 text-primary" />,
                title: "Rent Collection",
                description: "Automated payments with multiple payment options",
              },
              {
                icon: <Wrench className="h-8 w-8 text-primary" />,
                title: "Maintenance Tracking",
                description: "Submit and track maintenance requests easily",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Tenant Portal",
                description:
                  "Give tenants access to their documents and payments",
              },
              {
                icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
                title: "Automated Reminders",
                description: "Never miss a payment or important date",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Secure Documents",
                description:
                  "Cloud storage for all your important property documents",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="mt-4 text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Property Owner",
                content:
                  "RentFlow has saved me countless hours managing my rental properties. The automated reminders alone are worth it!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Tenant",
                content:
                  "As a tenant, I love being able to pay rent and submit maintenance requests through one app.",
                rating: 4,
              },
              {
                name: "David Wilson",
                role: "Property Manager",
                content:
                  "The document storage and lease management features have streamlined our operations significantly.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white border rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.content}"
                </p>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to simplify your rental management?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Join thousands of property owners and tenants using RentFlow
              today.
            </p>
            <a href="/signup">
              <Button variant="secondary" size="lg">
                Get Started Free <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">RentFlow</span>
              </div>
              <p className="text-sm">
                The complete property management solution for landlords and
                tenants.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/signup" className="text-sm hover:text-white">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} RentFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-sm hover:text-white">
                Terms
              </a>
              <a href="#" className="text-sm hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
