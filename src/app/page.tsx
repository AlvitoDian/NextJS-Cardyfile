import {
  ChevronRight,
  Star,
  User,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";
import EmailSection from "@/components/EmailSection";
import Image from "next/image";

export default function Home() {
  const plans = [
    {
      id: 1,
      name: "Free",
      description: "Start for free with basic features",
      price: "Rp0",
      highlight: false,
      features: ["1 profile card", "Basic templates", "No export available"],
      button: "Get Started",
      buttonClass: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      borderColor: "border-gray-200",
      barColor: "bg-gray-200",
    },
    {
      id: 2,
      name: "Pro",
      description: "For active users & professionals",
      price: "Rp50,000/mo",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Up to 10 profile cards",
        "Export to PDF & PNG",
        "Custom subdomain",
      ],
      button: "Get Pro",
      buttonClass: "bg-[#e44b37] text-white hover:bg-opacity-90",
      borderColor: "border-2 border-[#e44b37]",
      barColor: "bg-[#e44b37]",
    },
    {
      id: 3,
      name: "Royal",
      description: "All-inclusive for brands & businesses",
      price: "Rp100,000/mo",
      highlight: false,
      features: [
        "Unlimited profile cards",
        "All premium templates",
        "All export formats",
        "Custom domain support",
        "Visitor analytics",
        "No watermark",
        "Personal branding",
        "Priority support",
      ],
      button: "Get Royal",
      buttonClass: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      borderColor: "border-gray-200",
      barColor: "bg-gray-200",
    },
  ];

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Cardyfile helped me create professional digital business cards that really impressed my clients. The templates are beautiful and so easy to customize!",
      author: "Jane Doe",
      role: "Freelance Designer",
      initials: "JD",
    },
    {
      id: 2,
      rating: 5,
      text: "I needed profile cards for my team quickly, and Cardyfile delivered. The platform is intuitive and the results look like they were made by professional designers.",
      author: "Robert Johnson",
      role: "Startup Founder",
      initials: "RJ",
    },
    {
      id: 3,
      rating: 5,
      text: "As someone with no design experience, I was able to create stunning profile cards in minutes. The customer support is also excellent!",
      author: "Sarah Lee",
      role: "Marketing Manager",
      initials: "SL",
    },
  ];

  const features = [
    {
      icon: ImageIcon,
      title: "Beautiful Templates",
      description:
        "Choose from dozens of professionally designed templates and customize them to match your style.",
    },
    {
      icon: User,
      title: "Easy Customization",
      description:
        "Simple drag-and-drop editor makes it easy to create the perfect profile card in minutes.",
    },
    {
      icon: ExternalLink,
      title: "Share Anywhere",
      description:
        "Share your profile cards or share them directly to social media and professional networks.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Choose a template",
      description:
        "Browse our collection of professional templates for any occasion.",
    },
    {
      number: 2,
      title: "Customize your card",
      description:
        "Add your information, photos, and adjust colors to match your style.",
    },
    {
      number: 3,
      title: "Share everywhere",
      description: "Download your card directly to your networks.",
    },
  ];

  const benefits = [
    "Choose from 10+ professionally designed templates",
    "Customize with your brand colors and logos",
    "Add social media links and contact information",
    "Export in multiple formats for any platform",
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e44b37] opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e44b37] opacity-10 rounded-full -ml-48 -mb-48"></div>

        <div className="md:w-1/2 mb-10 md:mb-0 relative z-10">
          <div className="w-20 h-8 bg-[#e44b37] mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Create stunning{" "}
            <span className="text-[#e44b37]">profile cards</span> in minutes
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Design professional profile cards and digital business cards that
            stand out. Easy to use, fully customizable, and ready to share.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={"/dashboard"}
              className="px-6 py-3 bg-[#e44b37] text-white rounded-md hover:bg-opacity-90 transition flex items-center justify-center"
            >
              Get Started <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/templates"
              className="px-6 py-3 border border-[#e44b37] text-[#e44b37] rounded-md hover:bg-red-50 transition"
            >
              View Templates
            </Link>
          </div>
        </div>

        {/* Profile Cards Preview */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 transform rotate-3 absolute top-4 right-4 z-10 w-64">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="text-gray-400" size={32} />
                </div>
              </div>
              <h3 className="text-center font-bold">John Smith</h3>
              <p className="text-center text-gray-500 text-sm">
                Product Designer
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                <div className="w-6 h-6 rounded-full bg-[#e44b37]"></div>
              </div>
            </div>
            <div className="bg-[#e44b37] shadow-xl rounded-xl p-6 border border-red-700 transform -rotate-6 absolute -top-4 -left-4 z-20 w-64 text-white">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#e44b37]">
                  <span className="text-2xl font-bold">AS</span>
                </div>
              </div>
              <h3 className="text-center font-bold">Anna Smith</h3>
              <p className="text-center text-white text-opacity-90 text-sm">
                Marketing Specialist
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white"></div>
                <div className="w-6 h-6 rounded-full bg-red-800"></div>
                <div className="w-6 h-6 rounded-full bg-red-300"></div>
              </div>
            </div>
            <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 z-30 relative w-72">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#e44b37] to-red-700 flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">TS</span>
                </div>
              </div>
              <h3 className="text-center font-bold text-lg">Tom Stevens</h3>
              <p className="text-center text-gray-500">Web Developer</p>
              <div className="mt-6 flex justify-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#e44b37] flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#e44b37] flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#e44b37] flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-[#e44b37] text-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why choose{" "}
            <span className="underline decoration-white">Cardyfile</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-gray-800"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="text-[#e44b37]" size={24} />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center text-center p-6 rounded-lg bg-red-50 border-l-4 border-[#e44b37]"
              >
                <div className="w-16 h-16 bg-[#e44b37] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-12 bg-[#e44b37] bg-opacity-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                fill
                src="/api/placeholder/540/400"
                alt="Profile maker app showcase"
                className="rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Create <span className="text-[#e44b37]">professional</span>{" "}
                cards in minutes
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#e44b37] flex items-center justify-center text-white mt-1 mr-3">
                      ✓
                    </div>
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
              <button className="mt-8 px-6 py-3 bg-[#e44b37] text-white rounded-md hover:bg-opacity-90 transition">
                Try for Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            What our users say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#e44b37] bg-opacity-5 p-6 rounded-lg border border-[#e44b37] border-opacity-20"
              >
                <div className="flex text-[#e44b37] mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#e44b37" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#e44b37] flex items-center justify-center text-white mr-3">
                    <span className="font-bold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Client Component */}
      <section id="pricing" className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e44b37] opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e44b37] opacity-10 rounded-full -ml-48 -mb-48"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the plan that works for you and start creating beautiful
            profile cards today.
          </p>

          <PricingSection plans={plans} />
        </div>
      </section>

      {/* CTA Section with Client Component */}
      <ClientCTASection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t-4 border-[#e44b37]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-[#e44b37]">
                Cardyfile
              </h3>
              <p className="text-gray-400">
                Create stunning profile cards and digital business cards in
                minutes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/updates"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-400 hover:text-[#e44b37] transition"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Cardyfile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

// Client component for payment handling
function ClientCTASection() {
  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-r from-[#e44b37] to-red-700 text-white"
    >
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to create stunning profile cards?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who trust Cardyfile for their digital
          identity needs.
        </p>
        <div className="max-w-md mx-auto">
          <EmailSection />
          <p className="text-sm mt-4 text-white text-opacity-80">
            No credit card required. Free 14-day trial.
          </p>
        </div>
      </div>
    </section>
  );
}
