'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Who owns the images and design elements on Lomo?',
    answer:
      'Lomo does not own or license the backgrounds, design elements, or other assets available in the app. All assets are freely sourced from designers and creators on platforms like Figma. We do not claim ownership over any of these assets.',
  },
  {
    question: 'Can I use the thumbnails I create for commercial purposes?',
    answer:
      'Yes, you are free to use the thumbnails you create with Lomo for personal or commercial projects. However, since we do not own the assets, it is your responsibility to ensure that their usage aligns with any applicable terms set by the original creators.',
  },
  {
    question: 'Does Lomo provide copyright protection for the assets used?',
    answer:
      "No. Lomo does not provide any copyright licenses or guarantees for the assets. If you require specific usage rights, we recommend reviewing the original creator's terms or sourcing assets from platforms that provide clear licensing information.",
  },
  {
    question: 'Where can I find credits for the assets used in Lomo?',
    answer:
      'We maintain a credit page where we acknowledge the original designers and creators of the assets available in Lomo. We encourage users to check this page for more details.',
  },
  {
    question: 'What if I upload my own images or elements?',
    answer:
      'If you upload your own content, you are responsible for ensuring you have the rights to use it. Lomo does not take responsibility for any copyright claims related to user-uploaded content.',
  },
  {
    question: 'How can I report a copyright concern?',
    answer:
      'If you believe an asset used in Lomo violates copyright or is misattributed, please contact our support team. We are committed to addressing any concerns and making necessary adjustments.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid md:grid-cols-[1fr,1.5fr] gap-12 items-start">
        <div className="space-y-6">
          <span className="text-sm font-medium text-muted-foreground tracking-wider">
            COPYRIGHT INFO
          </span>
          <h2 className="text-5xl font-semibold leading-tight">
            Copyright &
            <br />
            Usage Rights
          </h2>
          <p className="text-xl text-muted-foreground">
            Important information about asset ownership, usage rights, and copyright considerations
            when using Lomo.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{ backgroundColor: openIndex === index ? 'var(--muted)' : 'transparent' }}
              className="rounded-2xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium pr-8">{faq.question}</span>
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-background border"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
