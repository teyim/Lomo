import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm sm:text-base text-gray-500">
            © {new Date().getFullYear()} Lomo AI. All rights reserved.
          </div>

          {/* Divider for mobile */}
          <div className="block md:hidden w-full h-px bg-gray-200" />

          {/* Creator */}
          <div className="text-sm sm:text-base text-gray-500 flex items-center gap-2">
            <span>Crafted with</span>
            <span className="text-red-500">❤️</span>
            <span>by</span>
            <a
              href="https://github.com/teyim"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-800 hover:text-gray-900 transition-colors"
            >
              Teyim Asobo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
