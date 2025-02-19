import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { navbarLinks } from '@/constants';
import { Github } from 'lucide-react';
import logoImage from 'public/illustrations/cute-monkey-face.svg';
import Image from 'next/image';

function Navbar() {
  return (
    <nav className="container mx-auto py-6 px-4 grid grid-cols-3 items-center z-30">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="size-12  rounded-full">
          <Image
            src={logoImage}
            alt="Lomo Logo"
          />
        </div>
        <span className="font-bold text-xl">Lomo</span>
      </div>

      {/* Navigation Links - Centered */}
      <div className="flex justify-center items-center">
        <div className="flex gap-8 z-30">
          {navbarLinks.map(link => (
            <Link
              href={link.href}
              key={link.label}
              className="text-gray-600 hover:text-gray-900 hover:font-bold hover:underline no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-end items-center gap-4">
        <a
          href="https://github.com/teyim/Lomo"
          className="text-gray-700"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
          >
            <Github className="size-5" />
          </Button>
        </a>
        <Link
          href="/editor"
          className="no-underline text-white"
        >
          <Button className="bg-black hover:bg-black/90 text-white rounded-2xl relative z-30">
            Editor
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
