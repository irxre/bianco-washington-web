
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Reservation from '../components/Reservation';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Reservation />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
