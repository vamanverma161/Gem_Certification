import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4">
              GEM CERT
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The Indian Gems & Jewellery market has always been a benchmark for trade of gold, silver, gems & jewellery and has attracted traders from the world to practice their business in India. The emerging trend of Precious & Semi Precious Gemstones are the new gateway for the young traders. Previously, where gemstone like Ruby, Emerald, Diamond & etc.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-amber-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/service" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/report" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Certificate Verification
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} className="text-amber-400 flex-shrink-0" />
                <span>3120 Lane No 35, Beadonpura, Karol Bagh, New Delhi, Delhi 110005</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <span>Igcgemcenter@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <span>+911143571032</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; 2021 Triplex . All Rights Reserved . Design by Ruchika IT Solution</p>
        </div>
      </div>
    </footer>
  )
}
