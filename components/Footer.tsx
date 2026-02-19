import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "NEW DROPS", href: "/" },
    { name: "SHOP ALL", href: "/shop" },
    { name: "BESTSELLERS", href: "/bestsellers" },
    { name: "SHIRTS", href: "/shirts" },
    { name: "T-SHIRTS | POLO", href: "/t-shirts" },
    { name: "JEANS", href: "/jeans" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
    },
    {
      icon: Youtube,
      href: "#",
      label: "YouTube",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+6017-708 5596",
      href: "tel:+60177085596",
    },
    {
      icon: Mail,
      label: "Email",
      value: "support@bemen.com",
      href: "mailto:support@bemen.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Kuala Lumpur, Malaysia",
      href: "#",
    },
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-100 ">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-12 h-12">
                <Image
                  src="/assets/logo.jpg"
                  alt="Bemen Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-black uppercase">
                BEMEN
              </span>
            </Link>
            <p className="text-sm leading-relaxed ">
              Redefining modern fashion with premium quality and timeless designs. 
              Elevate your wardrobe with Bemen.
            </p>
            <div className="flex gap-5 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className=" hover:text-black transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-black mb-6 uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium hover:text-black transition-colors uppercase tracking-tight"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories/Services */}
          <div>
            <h3 className="text-xs font-bold text-black mb-6 uppercase tracking-widest">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-xs font-medium hover:text-black uppercase">Shipping Policy</Link></li>
              <li><Link href="#" className="text-xs font-medium hover:text-black uppercase">Returns & Exchange</Link></li>
              <li><Link href="#" className="text-xs font-medium hover:text-black uppercase">Track Order</Link></li>
              <li><Link href="#" className="text-xs font-medium hover:text-black uppercase">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-bold text-black mb-6 uppercase tracking-widest">
              Contact Us
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-start gap-3 group"
                >
                  <info.icon size={16} className=" group-hover:text-black mt-0.5" />
                  <div>
                    <p className="text-xs font-medium group-hover:text-black transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    
       
          <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
            © {new Date().getFullYear()} BEMEN. ALL RIGHTS RESERVED.
          </p>
  
  
    </footer>
  );
};

export default Footer;