'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    rating: 5,
    quote:
      "As a social media manager, I create thumbnails daily. Lomo's drag-and-drop tool and preset layouts cut my work time by 70%. The HD exports look flawless everywhere!",
    author: 'Marcus L.',
    role: 'Digital Marketing Agency',
  },
  {
    rating: 5,
    quote:
      "I love how Lomo's color suggestions take the guesswork out of design. My thumbnails finally match my brand's aesthetic—no more clashing colors!",
    author: 'Sophie K.',
    role: 'Small Business Owner',
  },
  {
    rating: 5,
    quote:
      "The layout options are insane! I can experiment with overlays, grids, or minimalist styles in seconds. It's like having a designer on standby.",
    author: 'Alex P.',
    role: 'Freelance Writer',
  },
  {
    rating: 5,
    quote:
      "Lomo's collaboration feature lets my team tweak thumbnails together in real-time. It's streamlined our workflow and made feedback loops so much easier.",
    author: 'Nadia V.',
    role: 'Content Team Lead',
  },
  {
    rating: 5,
    quote:
      "I run a nonprofit blog, and Lomo's free tier is a game-changer. The professional results make our content look polished, even on a tight budget.",
    author: 'Ethan T.',
    role: 'Nonprofit Communications Director',
  },
  {
    rating: 5,
    quote: 'Lomo saved me hours of fiddling with Photoshop. The color suggestions are genius!',
    author: 'Jamie R.',
    role: 'Lifestyle Blogger',
  },
  {
    rating: 5,
    quote: 'Finally, a tool that understands what bloggers need. My click-through rates doubled!',
    author: 'Priya T.',
    role: 'Tech Writer',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5 fill-[#C8FF32] text-[#C8FF32]"
          strokeWidth={1}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <div className="bg-[#0F1117] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          Loved by content creators worldwide
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: [0, -50 * testimonials.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 50,
              ease: 'linear',
            },
          }}
        >
          {/* Original testimonials */}
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1A1D26] p-6 rounded-2xl w-[400px] flex-shrink-0"
            >
              <StarRating rating={testimonial.rating} />
              <p className="text-white mb-4 text-lg leading-relaxed">"{testimonial.quote}"</p>
              <div className="text-gray-400">
                <p className="font-medium">— {testimonial.author}</p>
                <p className="text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}

          {/* Duplicated testimonials for seamless loop */}
          {testimonials.map((testimonial, index) => (
            <div
              key={`duplicate-${index}`}
              className="bg-[#1A1D26] p-6 rounded-2xl w-[400px] flex-shrink-0"
            >
              <StarRating rating={testimonial.rating} />
              <p className="text-white mb-4 text-lg leading-relaxed">"{testimonial.quote}"</p>
              <div className="text-gray-400">
                <p className="font-medium">— {testimonial.author}</p>
                <p className="text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
