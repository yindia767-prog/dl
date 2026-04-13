import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 font-ubuntu sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-600">We're here to help with your driving licence application</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
            <div className="bg-blue-50 p-4 rounded-2xl text-[#005dbe]">
              <Mail size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">Our support team usually responds within 24 hours.</p>
              <a href="mailto:info@drivinglicence.org.in" className="text-lg font-bold text-[#005dbe] mt-2 block">info@drivinglicence.org.in</a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
            <div className="bg-blue-50 p-4 rounded-2xl text-[#005dbe]">
              <MapPin size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-600">Agra, Uttar Pradesh - 282001</p>
              <p className="text-sm text-gray-400 mt-1">Please note: Document submission is currently online only.</p>
            </div>
          </div>
        </div>

        <form className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
              <input type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#005dbe] outline-none transition-all" placeholder="Enter your name" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Email Address</label>
              <input type="email" className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#005dbe] outline-none transition-all" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Message</label>
              <textarea rows={4} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#005dbe] outline-none transition-all" placeholder="How can we help you?"></textarea>
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-[#005dbe] text-white font-bold text-lg hover:bg-blue-700 shadow-lg transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
