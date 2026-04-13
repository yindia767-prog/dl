import { CheckCircle2, IndianRupee, ShieldCheck, Zap } from "lucide-react";

export default function PricingPage() {
  const tiers = [
    {
      name: "Learning Licence",
      price: "1100",
      description: "Complete assistance for new learners",
      features: [
        "Consultancy & Guidance",
        "Document Verification",
        "Application Review",
        "Test Slot Booking Info",
        "Learning Kit Guide"
      ],
      popular: true
    },
    {
      name: "Licence Renewal",
      price: "1400",
      description: "Fast renewal for expired licences",
      features: [
        "Expedited Review",
        "Renewal Document Check",
        "Online Status Tracking",
        "Consultancy Support",
        "Process Assistance"
      ],
      popular: false
    },
    {
      name: "Other Services",
      price: "800",
      description: "Duplicate or Address Change",
      features: [
        "Standard Consultancy",
        "Correction Guidance",
        "Duplicate Application Aid",
        "Address Update Help",
        "Document Checklist"
      ],
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 font-ubuntu sm:text-5xl">
          Transparent Service Pricing
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Professional consultancy fees tailored to your specific service needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className={`bg-white border-2 rounded-3xl p-8 relative overflow-hidden flex flex-col ${
              tier.popular ? 'border-[#005dbe] shadow-2xl scale-105 z-10' : 'border-gray-100 shadow-xl'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 bg-[#005dbe] text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-sm text-gray-500">{tier.description}</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight text-gray-900">₹{tier.price}</span>
                <span className="ml-1 text-sm font-medium text-gray-500">/service</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#005dbe] shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <a 
              href="/apply" 
              className={`block w-full text-center py-4 px-6 rounded-xl font-bold text-sm transition-all shadow-lg ${
                tier.popular 
                ? 'bg-[#005dbe] text-white hover:bg-blue-700 hover:shadow-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 bg-blue-50 p-10 rounded-3xl border border-blue-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">International Permit (IDP)</h2>
          <p className="text-gray-600 mb-6">Need to drive abroad? Our expert consultants facilitate the IDP application process with full guidance on required documentation for ₹2,500.</p>
          <div className="flex items-center gap-4">
             <span className="text-3xl font-bold text-[#005dbe]">₹2,500</span>
             <a href="/apply" className="text-sm font-bold text-[#005dbe] hover:underline">Apply for IDP →</a>
          </div>
        </div>
        <div className="border-l border-blue-200 pl-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Permanent Licence</h2>
          <p className="text-gray-600 mb-6">Transitioning from a learner's to a permanent licence? We handle the coordination and document review for ₹1,600.</p>
          <div className="flex items-center gap-4">
             <span className="text-3xl font-bold text-[#005dbe]">₹1,600</span>
             <a href="/apply" className="text-sm font-bold text-[#005dbe] hover:underline">Apply for Permanent →</a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
        <div>
          <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#005dbe]">
            <IndianRupee size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">One-Time Fee</h3>
          <p className="text-xs text-gray-600">Our consultancy fee is a single payment for the entire selected process.</p>
        </div>
        <div>
          <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#005dbe]">
            <Zap size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Expert Review</h3>
          <p className="text-xs text-gray-600">Every application is manually reviewed by a consultant for accuracy.</p>
        </div>
        <div>
          <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#005dbe]">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Encrypted Payment</h3>
          <p className="text-xs text-gray-600">All transactions are processed through 256-bit SSL secure gateways.</p>
        </div>
      </div>
    </div>
  );
}
