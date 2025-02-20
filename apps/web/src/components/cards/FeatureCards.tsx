import { Badge } from '@/components/ui/badge';
import { ImageIcon, Palette, Layout, MousePointer, Download } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardFooter } from '../ui/card';

export default function FeatureCards() {
  const features = [
    {
      icon: ImageIcon,
      title: 'Curated Background Library',
      description:
        'Browse dozens of handpicked, high-quality backgrounds optimized for blogs, social media, and more.',
      badges: ['HD Quality', 'Optimized', 'Social Media Ready'],
    },
    {
      icon: Palette,
      title: 'Smart Color Matching',
      description:
        'Every background comes with pre-selected text and accent colors for maximum readability and visual harmony.',
      badges: ['Auto-Match', 'Accessibility', 'Color Theory'],
    },
    {
      icon: Layout,
      title: 'Flexible Layouts',
      description:
        'Choose from grid, split-screen, overlay, and minimalist designs. Adjust spacing, alignment, and hierarchy with one click.',
      badges: ['Grid', 'Split-screen', 'Overlay'],
    },
    {
      icon: MousePointer,
      title: 'Drag-and-Drop Customization',
      description:
        'Add text, upload images, resize elements, and experiment with fonts—no design skills required.',
      badges: ['No-code', 'Easy Edit', 'Customizable'],
    },
    {
      icon: Download,
      title: 'Export Ready',
      description: 'Download thumbnails in HD (PNG, JPG) or save presets for future posts.',
      badges: ['HD Export', 'Multiple Formats', 'Presets'],
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
          Why Lomo?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="space-y-4 p-6">
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </CardHeader>
              <CardFooter className="p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {feature.badges.map(badge => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className="rounded-full text-xs sm:text-sm"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
