import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apply Now', href: '/apply' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Refunds Policy', href: '/refund' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-[#005dbe] font-ubuntu truncate pr-4">
              Driving Licence
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#005dbe] transition-colors border-b-2 border-transparent hover:border-[#005dbe] py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="text-gray-700 hover:text-[#005dbe]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
