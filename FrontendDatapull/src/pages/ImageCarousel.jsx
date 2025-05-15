import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel() {
  // Images du carousel avec descriptions
  const slides = [
    {
      id: 1,
      image: "/api/placeholder/640/360",
      title: "Ghost Mail Hunter",
      description: "Découvrez des emails professionnels cachés que personne d'autre ne peut trouver.",
    },
    {
      id: 2,
      image: "/api/placeholder/640/360",
      title: "Personal Search",
      description: "Trouvez rapidement des contacts en recherchant par nom, prénom et autres critères personnalisés.",
    },
    {
      id: 3,
      image: "/api/placeholder/640/360",
      title: "Map Search",
      description: "Filtrez vos recherches par emplacements spécifiques avec notre interface de carte interactive.",
    },
    {
      id: 4,
      image: "/api/placeholder/640/360",
      title: "Company Trace",
      description: "Identifiez rapidement les emails valides pour n'importe quelle entreprise en utilisant le domaine.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fonction pour passer à l'image suivante
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  // Fonction pour revenir à l'image précédente
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  // Fonction pour aller à une diapositive spécifique
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full bg-white p-4 rounded-lg shadow-xl">
      {/* Image courante */}
      <div className="relative h-64 md:h-80 overflow-hidden rounded-md">
        <img 
          src={slides[currentIndex].image} 
          alt={slides[currentIndex].title} 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Overlay pour le texte */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{slides[currentIndex].title}</h3>
          <p className="text-sm">{slides[currentIndex].description}</p>
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <button 
          onClick={prevSlide}
          className="p-1 bg-white/30 rounded-full backdrop-blur-sm text-white hover:bg-white/50 transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <button 
          onClick={nextSlide}
          className="p-1 bg-white/30 rounded-full backdrop-blur-sm text-white hover:bg-white/50 transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicateurs de diapositive */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-red-500" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}