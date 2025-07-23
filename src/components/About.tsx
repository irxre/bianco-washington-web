
import React from 'react';
import { Award, Users, MapPin, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Proven Excellence",
      description: "Built on the success of our beloved Sunderland location, bringing the same quality and passion."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Creating a welcoming space where locals gather for exceptional food and memorable experiences."
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Perfectly positioned in the heart of Washington, easily accessible for all our guests."
    },
    {
      icon: Heart,
      title: "Passionate Team",
      description: "Led by experienced professionals who care deeply about hospitality and culinary excellence."
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Bianco began as a dream in Sunderland, where we established ourselves as a destination 
              for modern European cuisine and expertly crafted cocktails. Our success wasn't built 
              on luck, but on an unwavering commitment to quality ingredients, innovative flavors, 
              and genuine hospitality.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Now, we're excited to bring that same passion to Washington. Our new location at 
              18 Front Street represents more than just an expansion—it's our commitment to 
              creating another gathering place where great food, exceptional drinks, and warm 
              hospitality come together.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Under the guidance of our original founder and managed by our experienced team, 
              Bianco Washington will offer the same elevated dining experience that made our 
              Sunderland location a local favorite.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors duration-200"
              >
                Explore Our Menu
              </button>
              <button
                onClick={() => document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-md font-medium transition-all duration-200"
              >
                Find Us
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-muted-foreground">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
