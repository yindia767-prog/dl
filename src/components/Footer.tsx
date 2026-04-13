import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-[#ababab] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h2 className="text-white text-xl font-bold mb-6 font-ubuntu">About Us</h2>
            <p className="text-sm leading-relaxed">
              Welcome to drivinglicence.org.in, a trustworthy site with information on licensing procedures.
              Our expert consultants are here to help you navigate the application process seamlessly.
            </p>
            <Link href="/" className="inline-block mt-4 text-[#005dbe] hover:underline">
              Read More...
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white text-xl font-bold mb-6 font-ubuntu">Quick Links</h2>
            <ul className="space-y-3">
              <li><Link href="/disclosure" className="text-sm hover:text-white transition-colors">Disclosure</Link></li>
              <li><Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-sm hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms & Condition</Link></li>
            </ul>
          </div>

          {/* Contact Section (Hidden in PHP but info preserved) */}
          <div>
            <h2 className="text-white text-xl font-bold mb-6 font-ubuntu">Contact Info</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="block text-white font-medium">Location:</span>
                Agra, Uttar Pradesh - 282001
              </li>
              <li>
                <span className="block text-white font-medium">Email:</span>
                info@drivinglicence.org.in
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© Copyright 2023 Driving Licence | All Rights Reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Google+</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
