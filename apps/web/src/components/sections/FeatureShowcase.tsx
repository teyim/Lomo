'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Palette, LayoutGrid, Settings2, Download, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Pick Your Background',
    description: 'Select from vibrant gradients, textures, or upload your own(coming).',
    chart: {
      total: 'Step 1',
      data: [350, 280, 420, 480, 380, 320],
    },
  },
  {
    icon: LayoutGrid,
    title: 'Choose a Layout',
    description: 'Find the perfect structure for your text and images.',
    chart: {
      total: 'Step 2',
      data: [420, 380, 520, 580, 480, 420],
    },
  },
  {
    icon: Settings2,
    title: 'Customize Everything',
    description:
      'Tweak colors, fonts, and positioning. Add drop shadows, borders, or opacity effects.',
    chart: {
      total: 'Step 3',
      data: [580, 480, 620, 680, 580, 520],
    },
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Get your thumbnail in one click and make your blog stand out.',
    chart: {
      total: 'Step 4',
      data: [680, 580, 720, 780, 680, 620],
    },
  },
];

export default function FeatureShowcase() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
        <p className="text-xl text-muted-foreground">
          Create stunning thumbnails in four simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setSelectedFeature(index)}
              className={`w-full text-left p-6 rounded-xl transition-colors ${
                selectedFeature === index
                  ? 'bg-primary/5 border-l-4 border-primary'
                  : 'hover:bg-muted'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg ${selectedFeature === index ? 'bg-primary/10' : 'bg-muted'}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${selectedFeature === index ? 'rotate-90' : ''}`}
                    />
                  </div>
                  <p className="text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="relative h-[400px] bg-muted/30 rounded-3xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              <div className="bg-background rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-1">Total Bill</div>
                  <div className="text-3xl font-bold">{features[selectedFeature].chart.total}</div>
                </div>
                <div className="h-[200px] flex items-end gap-2">
                  {features[selectedFeature].chart?.data?.map((value, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-primary/80"
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 800) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
                    <div key={month}>{month}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
