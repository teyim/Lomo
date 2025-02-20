import StackedCards from '@/components/StackedCards';
import Header from '@/components/Header';
import FeatureCards from '@/components/cards/FeatureCards';
import FeatureShowcase from '@/components/sections/FeatureShowcase';
import Testimonials from '@/components/sections/Testimonials';
import FAQSection from '@/components/sections/Faq';

export default function Home() {
  return (
    <main>
      <Header />
      <div className=" relative z-10">
        <StackedCards />
      </div>
      <FeatureCards />
      <FeatureShowcase />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
