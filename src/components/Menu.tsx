
import React, { useState } from 'react';
import { ChefHat, Wine, Coffee, Utensils } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('starters');

  const menuCategories = [
    { id: 'starters', name: 'Starters', icon: ChefHat },
    { id: 'mains', name: 'Mains', icon: Utensils },
    { id: 'desserts', name: 'Desserts', icon: Coffee },
    { id: 'drinks', name: 'Drinks', icon: Wine },
  ];

  const menuItems = {
    starters: [
      { name: 'Burrata with Roasted Tomatoes', price: '£12', description: 'Fresh burrata with heritage tomatoes, basil oil, and sourdough crostini' },
      { name: 'Pan-Seared Scallops', price: '£16', description: 'Diver scallops with cauliflower purée, pancetta, and microgreens' },
      { name: 'Beef Carpaccio', price: '£14', description: 'Thinly sliced beef with rocket, parmesan, and truffle oil' },
      { name: 'Crispy Calamari', price: '£11', description: 'Fresh squid rings with garlic aioli and lemon' },
    ],
    mains: [
      { name: 'Dry-Aged Ribeye', price: '£32', description: '28-day aged ribeye with roasted vegetables and red wine jus' },
      { name: 'Pan-Roasted Halibut', price: '£26', description: 'Fresh halibut with seasonal vegetables and herb butter' },
      { name: 'Lamb Ragu Pappardelle', price: '£22', description: 'Slow-cooked lamb ragu with fresh pappardelle and parmesan' },
      { name: 'Roasted Chicken Supreme', price: '£20', description: 'Free-range chicken with roasted root vegetables and jus' },
    ],
    desserts: [
      { name: 'Chocolate Fondant', price: '£8', description: 'Warm chocolate fondant with vanilla ice cream' },
      { name: 'Lemon Posset', price: '£7', description: 'Silky lemon posset with shortbread biscuit' },
      { name: 'Tiramisu', price: '£8', description: 'Classic Italian tiramisu with coffee and mascarpone' },
      { name: 'Seasonal Fruit Tart', price: '£7', description: 'Fresh seasonal fruit with vanilla custard' },
    ],
    drinks: [
      { name: 'Bianco Signature Cocktail', price: '£12', description: 'Our signature blend with premium spirits and fresh ingredients' },
      { name: 'Negroni', price: '£10', description: 'Classic Italian aperitif with gin, vermouth, and Campari' },
      { name: 'Old Fashioned', price: '£11', description: 'Bourbon whiskey with sugar, bitters, and orange peel' },
      { name: 'Prosecco', price: '£8', description: 'Italian sparkling wine, perfect for celebrations' },
    ],
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of modern European dishes and expertly crafted cocktails
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              <category.icon className="h-5 w-5 mr-2" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                  <span className="text-xl font-bold text-primary">{item.price}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu PDF Notice */}
        <div className="mt-16 text-center">
          <div className="bg-secondary/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Full Menu Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              We're putting the finishing touches on our complete menu. Stay tuned for our full 
              selection of dishes, wines, and signature cocktails.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors duration-200"
            >
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
