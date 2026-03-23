

import React from 'react';


const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-dark border-t border-gold/20 px-6 py-8
        grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

        {/* Left — contact */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-gold mb-3">
            Connect With Us
          </h4>
          <p className="text-sm text-gray-400 leading-8">📞 +91 940 001 3453</p>
          <a
            href="mailto:info@deepnetsoft.com"
            className="text-sm text-gray-400 hover:text-gold transition-colors"
          >
            info@deepnetsoft.com
          </a>
        </div>

        {/* Center — logo */}
        <div className="text-center">
          <p className="font-cinzel text-2xl tracking-widest">
            <span className="text-gold">DEEP</span>
            <span className="text-white">NET</span>
            <span className="text-gold">SOFT</span>
          </p>
          <p className="text-xs tracking-widest text-gray-500 font-light mt-1">
            SOLUTIONS
          </p>
        </div>

        {/* Right — address */}
        <div className="md:text-right">
          <h4 className="text-xs tracking-widest uppercase text-gold mb-3">
            Find Us
          </h4>
          <p className="text-sm text-gray-400 leading-7">
            First Floor, Geo Infopark,<br />
            Infopark EXPY, Kakkanad
          </p>
        </div>
      </footer>

      {/* Bottom bar */}
      <div className="bg-dark border-t border-gold/10 py-3 px-6 text-center text-xs text-gray-600">
        © 2024 Deepnetsoft Solutions. All rights reserved.
        &nbsp;|&nbsp;
        <a href="#" className="hover:text-gold transition-colors">
          Terms &amp; Conditions
        </a>
        &nbsp;|&nbsp;
        <a href="#" className="hover:text-gold transition-colors">
          Privacy Policy
        </a>
      </div>
    </>
  );
};

export default Footer;
