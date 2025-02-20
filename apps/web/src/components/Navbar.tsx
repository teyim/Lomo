'use client';
import React, { useState } from 'react';
import { Github, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { navbarLinks } from '@/constants';
import logoImage from 'public/illustrations/cute-monkey-face.svg';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="container mx-auto py-6 px-4 relative z-50">
      <div className="flex items-center justify-between lg:grid lg:grid-cols-3">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="size-12 rounded-full">
            <Image
              src={logoImage}
              alt="Lomo Logo"
            />
          </div>
          <span className="font-bold text-xl">Lomo</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="flex gap-8">
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

        {/* Desktop Buttons */}
        <div className="hidden lg:flex justify-end items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Github className="size-5" />
          </Button>
          <Button className="bg-black hover:bg-black/90 text-white rounded-2xl">Editor</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navbarLinks.map(link => (
                <Link
                  href={link.href}
                  key={link.label}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-900 py-2 hover:bg-gray-50 rounded-lg px-4"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t my-2" />
              <Button className="bg-black hover:bg-black/90 text-white rounded-2xl w-full">
                Editor
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
