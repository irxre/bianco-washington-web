
import React from 'react';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-8">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Opening Soon</span>
          </div>

          {/* Main Logo/Title */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold mb-4 text-shadow">
            Bianco
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-2 text-primary">
            Bar & Restaurant
          </p>
          
          <p className="text-lg sm:text-xl font-light mb-8 opacity-90">
            Washington
          </p>

          {/* Location */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm sm:text-base">18 Front St, Concord, Washington NE37 2BA</span>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            From the team behind Sunderland's beloved Bianco, we're bringing the same passion for 
            modern European cuisine and craft cocktails to the heart of Washington.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md text-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              View Menu
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-md text-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Get Notified
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-primary transition-colors duration-200 animate-bounce"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default Hero;
