import { CheckCircle2, IndianRupee, ShieldCheck, Zap } from "lucide-react";

export default function PricingPage() {
  const features = [
    "Consultancy & Guidance",
    "Application Review",
    "Document Assistance",
    "Process Status Tracking",
    "Customer Support",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 font-ubuntu sm:text-5xl">
          Simple & Transparent Pricing
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Professional consultancy fees for your driving licence application
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white border-2 border-[#005dbe] rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#005dbe] text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">
            Best Value
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-[#005dbe]" size={24} />
            <span className="font-bold text-gray-800 uppercase tracking-widest text-sm">Consultancy Fee</span>
          </div>
          
          <div className="mb-8">
            <div className="flex items-baseline">
              <span className="text-5xl font-extrabold tracking-tight text-gray-900">₹375</span>
              <span className="ml-1 text-xl font-medium text-gray-500">/application</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">One-time payment for complete assistance</p>
          </div>

          <ul className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-[#005dbe] shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <a 
            href="/apply" 
            className="block w-full text-center py-4 px-6 rounded-xl bg-[#005dbe] text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
          >
            Apply Now
          </a>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={14} />
            <span>Secure 256-bit SSL encrypted payment</span>
          </div>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-gray-50 p-12 rounded-3xl">
        <div>
          <div className="bg-white w-12 h-12 rounded-xl shadow-md flex items-center justify-center mx-auto mb-4 text-[#005dbe]">
            <IndianRupee size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">No Hidden Costs</h3>
          <p className="text-sm text-gray-600">The fee mentioned above covers our end-to-end consultancy services.</p>
        </div>
        <div>
          <div className="bg-white w-12 h-12 rounded-xl shadow-md flex items-center justify-center mx-auto mb-4 text-[#005dbe]">
            <Zap size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Fast Processing</h3>
          <p className="text-sm text-gray-600">Our experts ensure your application is reviewed within 24 business hours.</p>
        </div>
        <div>
          <div className="bg-white w-12 h-12 rounded-xl shadow-md flex items-center justify-center mx-auto mb-4 text-[#005dbe]">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Safe & Secure</h3>
          <p className="text-sm text-gray-600">Your data and payments are handled with bank-grade security protocols.</p>
        </div>
      </div>
    </div>
  );
}
