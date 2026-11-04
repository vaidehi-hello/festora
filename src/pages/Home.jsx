import Hero from '../components/Hero';
import EventCarousel from '../components/EventCarousel';
import Categories from '../components/Categories';
import { useTitle } from '../hooks/useTitle';

export default function Home() {
  useTitle('');
  return (
    <>
      <Hero />
      <EventCarousel />
      <Categories />
    </>
  );
}
