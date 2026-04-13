import Link from "next/link";
import { 
  Car, 
  CreditCard, 
  Settings, 
  Gauge, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  ThumbsUp
} from "lucide-react";

export default function Home() {
  const services = [
    { name: "Learner's Licence", icon: Car, href: "/apply" },
    { name: "Permanent Licence", icon: CreditCard, href: "/apply" },
    { name: "Commercial Licence", icon: Settings, href: "/apply" },
    { name: "Renew Licence", icon: Gauge, href: "/apply" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-[#005dbe]">
        <div className="absolute inset-0 z-0 opactiy-20">
          {/* We could use an Image here later */}
          <div className="w-full h-full bg-[linear-gradient(45deg,rgba(0,93,190,0.9),rgba(0,43,100,0.9))]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-ubuntu mb-6 drop-shadow-lg">
            Make a successful drive with us!
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Apply your licence today and get help from expert consultants for a seamless experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/apply" 
              className="px-8 py-4 bg-white text-[#005dbe] rounded-full font-bold uppercase transition-all hover:bg-blue-50 hover:scale-105"
            >
              Apply Now
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-white text-white rounded-full font-bold uppercase transition-all hover:bg-white hover:text-[#005dbe] hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link 
                key={index} 
                href={service.href}
                className="group relative overflow-hidden bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-50 text-[#005dbe] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#005dbe] group-hover:text-white transition-colors">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 font-ubuntu">{service.name}</h3>
                  <div className="mt-4 flex items-center text-sm font-medium text-[#005dbe] group-hover:gap-2 transition-all">
                    Apply Online <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-12">
            <span className="text-[#005dbe] font-bold tracking-widest uppercase text-sm">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-ubuntu">About Us</h2>
            <div className="w-20 h-1 bg-[#005dbe] mx-auto mt-4 rounded-full"></div>
          </div>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-lg mb-12">
            Welcome to drivinglicence.org.in, a trustworthy site with information on licensing procedures. 
            The information provided can be found in government sites, but in order to save time, 
            you can purchase our guides with everything you need to know to complete your driving licence 
            for only ₹375 + (Consultancy fees).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6">
              <ShieldCheck className="mx-auto text-[#005dbe] mb-4" size={48} />
              <h4 className="font-bold text-2xl">Verified</h4>
              <p className="text-gray-500 text-sm mt-2">Expert Consultation</p>
            </div>
            <div className="p-6">
              <Zap className="mx-auto text-[#005dbe] mb-4" size={48} />
              <h4 className="font-bold text-2xl">Fast</h4>
              <p className="text-gray-500 text-sm mt-2">Quick Process</p>
            </div>
            <div className="p-6">
              <Clock className="mx-auto text-[#005dbe] mb-4" size={48} />
              <h4 className="font-bold text-2xl">24/7</h4>
              <p className="text-gray-500 text-sm mt-2">Online Support</p>
            </div>
            <div className="p-6">
              <ThumbsUp className="mx-auto text-[#005dbe] mb-4" size={48} />
              <h4 className="font-bold text-2xl">Secure</h4>
              <p className="text-gray-500 text-sm mt-2">Safe Transactions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
