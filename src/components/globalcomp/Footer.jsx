import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* ===== FIRST ROW: GOOGLE MAP (with side margins) ===== */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 pt-8">
        <div className="w-full h-[200px] md:h-[250px] overflow-hidden rounded-lg shadow-sm">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343004!2d-73.9851076845846!3d40.7588969793269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ===== SECOND ROW: MAIN FOOTER CONTENT ===== */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Logo + Tagline */}
          <div>
            {/* Company Logo Image */}
            <img
              src="/public/logo.png"               // Replace with your actual logo path
              alt="Revadoo company logo"
              className="h-30 w-auto mb-4"   // Adjust size as needed
            />
            {/* <h2
              className="text-2xl font-bold leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em', color: '#0A0A0A' }}
            >
              Your Path To<br />Smarter Rewards<br />and real growth
            </h2> */}
            <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join thousands points earning daily.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-5 uppercase tracking-wider text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'About Us', 'Blog', 'FAQ', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, '')}`}
                    className="text-gray-500 hover:text-[#FF6B00] transition-colors no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal + Contact Us (stacked) */}
          <div className="space-y-8">
            {/* Legal */}
            <div>
              <h4 className="text-md font-semibold mb-5 uppercase tracking-wider text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Legal
              </h4>
              <ul className="space-y-3 text-sm">
                {['Terms & Conditions', 'Privacy Policy', 'Responsible Gaming'].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                      className="text-gray-500 hover:text-[#FF6B00] transition-colors no-underline"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-md font-semibold mb-5 uppercase tracking-wider text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Contact Us
              </h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF6B00]">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 7L2 7" />
                  </svg>
                  <a href="mailto:Support@revadoo.com" className="hover:text-[#FF6B00]">Support@revadoo.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF6B00]">
                    <path d="M22 16.92v3a1.999 1.999 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href="tel:+111256562548" className="hover:text-[#FF6B00]">+1 112 565 62548</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Payout Methods */}
          <div>
            <h4 className="text-md font-semibold mb-5 uppercase tracking-wider text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Payout Methods
            </h4>
            <p className="text-sm text-gray-500 mb-3">Fast Payouts via major providers.</p>
            {/* Optional payment badges */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">Visa</span>
              <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">Mastercard</span>
              <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">PayPal</span>
              <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">Crypto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar with copyright */}
      <div className="border-t border-gray-100 py-6">
        <div className="max-w-[1380px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026, Revadoo. All Rights Reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="/privacy" className="hover:text-[#FF6B00] transition">Privacy</a>
            <a href="/terms" className="hover:text-[#FF6B00] transition">Terms</a>
            <a href="/cookies" className="hover:text-[#FF6B00] transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}