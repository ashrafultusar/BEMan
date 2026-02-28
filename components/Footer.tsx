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
    { name: "SHOP ALL", href: "/shop/all" },
    { name: "BESTSELLERS", href: "/shop/all" }, // Path adjust kora hoyeche
    { name: "SHIRTS", href: "/shop/shirts" },
    { name: "T-SHIRTS | POLO", href: "/shop/t-shirts" },
    { name: "JEANS", href: "/shop/jeans" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=100091319571968",
      label: "Facebook",
      color: "text-[#1877F2]", 
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/be_men02/",
      label: "Instagram",
      color: "text-[#E4405F]", 
    },
    
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "01644044539",
      href: "tel:+8801644044539",
      iconColor: "text-green-500", // WhatsApp/Phone green
    },
    {
      icon: Mail,
      label: "Email",
      value: "bemen2023@gmail.com",
      href: "mailto:bemen2023@gmail.com",
      iconColor: "text-amber-500",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Mirpur 1 ,ZOO ROAD", 
      href: "#",
      iconColor: "text-red-500",
    },
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
            <div className="relative w-32 md:w-40 h-10 md:h-12">
                            <Image 
                              src="/assets/logo.jpeg" 
                              alt="BEMEN Logo" 
                              fill 
                              priority 
                              className="object-contain" 
                            />
                          </div>
             
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Redefining modern fashion with premium quality and timeless designs. 
              Elevate your wardrobe with BEMEN.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full hover:bg-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className={`${social.color} transition-transform group-hover:scale-110`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.3em]">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.3em]">
              Support
            </h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest">Shipping Policy</Link></li>
              <li><Link href="#" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest">Returns & Exchange</Link></li>
              <li><Link href="#" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest">Track Order</Link></li>
              <li><Link href="#" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.3em]">
              Contact Us
            </h3>
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 group-hover:border-gray-600 transition-all">
                    <info.icon size={14} className={`${info.iconColor}`} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors tracking-wide">
                    {info.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 py-8">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em] text-center">
          © {new Date().getFullYear()} BEMEN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;