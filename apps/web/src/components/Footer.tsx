import React from 'react';

function Footer() {
  return (
    <section className="container mx-auto px-4 pt-24 pb-32 text-center relative">
      {/* ...existing hero content... */}

      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        <p className="font-normal">
          © {new Date().getFullYear()} Lomo AI. All rights reserved.
          <span className="mx-2">•</span>
          <span className="hover:text-gray-700 transition-colors">
            Crafted with ❤️ by{' '}
            <a className="font-bold text-gray-800 hover:text-gray-900 cursor-pointer">
              Teyim Asobo
            </a>
          </span>
        </p>
      </footer>
    </section>
  );
}

export default Footer;
