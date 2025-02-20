import { Badge } from '@/components/ui/badge';
import { ImageIcon, Palette, Layout, MousePointer, Download } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Lomo?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg rounded-3xl hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <feature.icon className="w-8 h-8 mb-4 text-gray-700" />
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.badges.map(badge => (
                      <Badge
                        key={badge}
                        variant="outline"
                        className="rounded-full font-normal bg-transparent"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
