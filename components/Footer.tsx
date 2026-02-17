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
      { name: "Home", href: "/" },
      { name: "Home Stay", href: "/homestay" },
      { name: "Services", href: "/ourServices" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contactUs" },
      { name: "Book Now", href: "/homestay" },
    ];
  
    const socialLinks = [
      {
        icon: Facebook,
        href: "https://www.facebook.com/profile.php?id=61560087117685&rdid=9P8cnr3c5xrOOvLV&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17QZu6Fp2u%2F#",
        label: "Facebook",
        brandClass: "bg-[#1877F2] hover:bg-[#1877F2]/90 text-white",
      },
      {
        icon: Instagram,
        href: "#",
        label: "Instagram",
        brandClass:
          "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white",
      },
      {
        icon: Twitter,
        href: "#",
        label: "Twitter",
        brandClass: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white",
      },
      {
        icon: Youtube,
        href: "#",
        label: "YouTube",
        brandClass: "bg-[#FF0000] hover:bg-[#FF0000]/90 text-white",
      },
    ];
  
    const contactInfo = [
      {
        icon: Phone,
        label: "Phone",
        value: "+6017-708 5596",
        href: "tel:+888045425560",
      },
      {
        icon: Mail,
        label: "Email",
        value: "izzanglobalhospitality@gmail.com",
        href: "izzanglobalhospitality@gmail.com",
      },
      {
        icon: MapPin,
        label: "Address",
        value: "8 Jalan Cendana Mercu Summer Suites, Kampung Baru, Kuala Lumpur, 50250, Malaysia",
        href: "#",
      },
    ];
  
    return (
      <footer className="bg-[#2a2622] text-white/80">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/assets/logo/logo.png" 
                      alt="Izzan Global Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold text-white">
                    Izzan Global
                  </span>
                  <span className="text-xs tracking-[0.2em] text-[#D4AF37] font-medium uppercase">
                  Hospitality 
                  </span>
                </div>
              </div>
  
              <p className="text-white/60 leading-relaxed text-sm">
                Experience unparalleled luxury and world-class hospitality at
                Izzan Global. Where every stay becomes a cherished memory and
                every moment is crafted to perfection.
              </p>
  
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social) => (
                  <a target="_blank"
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${social.brandClass} hover:scale-110 active:scale-95 shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-[#D4AF37]/20">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 group text-white/60 hover:text-[#D4AF37] transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors" />
                      <span className="text-sm group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
  
  
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-[#D4AF37]/20">
                Contact Us
              </h3>
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                      <info.icon size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/90 group-hover:text-[#D4AF37] transition-colors">
                        {info.label}
                      </p>
                      <p className="text-sm text-white/60 group-hover:text-white/90 transition-colors mt-1">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  