import React, { useState, useEffect } from "react";
import {
  Search,
  Map,
  FlaskConical,
  Building,
  ChevronRight,
  BarChart2,
  Users,
  Mail,
  Globe,
  Check,
  ChevronLeft,
} from "lucide-react";
import dashboardImage from "../../public/images/brand/image.png";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("features");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigate = useNavigate();

  // Animation for scroll
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const gradientStyle = {
    background: "linear-gradient(135deg, #b24592 0%, #f15f79 100%)",
  };

  const carouselData = [
    {
      id: 0,  // Add a new item at the beginning
      image: "../../public/images/brand/solutions.png", // Use an appropriate image
      title: "Voir toutes nos solutions",
      description: "Découvrez notre page de solutions pour explorer toutes les fonctionnalités de DataPull.",
      demoUrl: "/solutions",
      id: 1,
      image: "../../public/images/brand/pgh1.png",
      title: "Tableau de bord analytique des utilisateurs",
      description:
        "Visualisez en temps réel les statistiques démographiques et de localisation de votre base d’utilisateurs avec DataPull.",
      demoUrl: "/home",
    },
    {
      id: 2,
      image: "../../public/images/brand/CT.png",
      title: "Trouvez des emails professionnels en quelques clics",
      description:
        "DataPull vous aide à découvrir des adresses email valides pour vos prospections B2B et votre développement commercial.",
      demoUrl: "/company-trace",
    },
    {
      id: 3,
      image: "../../public/images/brand/PS.png",
      title: "Enrichissez votre base de données de contacts",
      description:
        "Identifiez les décideurs clés et connectez-vous directement avec eux pour développer votre réseau professionnel.",
      demoUrl: "/personal-search",
    },
    {
      id: 4,
      image: "../../public/images/brand/GMH.png",
      title: "Optimisez votre stratégie d'acquisition",
      description:
        "Améliorez vos taux de conversion grâce à des contacts vérifiés et des données fiables pour votre prospection.",
      demoUrl: "/gMail",
    },
    {
      id: 5,
      image: "../../public/images/brand/MS.png",
      title: "Automatisez votre recherche de leads",
      description:
        "Gagnez du temps précieux avec notre solution qui simplifie et accélère votre processus de prospection commerciale.",
      demoUrl: "/map-search",
    },
  ];

  // Fonction pour passer à l'image suivante
  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fonction pour passer à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  // Fonction pour aller directement à une diapositive spécifique
  const goToSlide = (index) => {
    setCurrentSlideIndex(index);
  };
const goToSolutionsPage = () => {
  navigate('/solutions');
};
  // Rotation automatique des diapositives
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change de diapositive toutes les 5 secondes

    // Nettoyer le timer lors du démontage du composant
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div
              className="text-red-500 mr-2"
              style={{ color: "rgb(244, 84, 92)" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="8" rx="4" fill="currentColor" />
                <rect y="16" width="40" height="8" rx="4" fill="currentColor" />
                <rect y="32" width="40" height="8" rx="4" fill="currentColor" />
              </svg>
            </div>
            <div className="flex items-center">
              <span className="transition-all duration-300 group-hover:scale-105 ">
                <span
                  className="font-bold group-hover:text-red-500 text-lg "
                  style={{ color: "rgb(244, 84, 92)", fontSize: "2rem" }}
                >
                  Data
                </span>
                <span
                  className="text-gray-700 font-semibold group-hover:text-gray-900 text-lg "
                  style={{ fontSize: "2rem" }}
                >
                  Pull
                </span>

                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 group-hover:bg-red-200">
                  Beta
                </span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-600 hover:text-gray-900"
            >
              Fonctionnalités
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-600 hover:text-gray-900"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-600 hover:text-gray-900"
            >
              Tarifs
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-600 hover:text-gray-900"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => navigate("/signin")}
            >
              Se connecter
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              style={gradientStyle}
              onClick={() => navigate("/signup")}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              {/* Texte synchronisé avec le carousel */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {carouselData[currentSlideIndex].title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {carouselData[currentSlideIndex].description}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
                  style={gradientStyle}
                >
                  Essayer gratuitement
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <button
                    onClick={() => navigate('/solutions')}

                  className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center"
                >
                  Voir la démonstration
                </button>
              </div>
            </div>
            <div className="">
              {/* Carousel d'images */}
              <div className="bg-gray-900 p-1 rounded-lg shadow-xl ">
                <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-md">
                  {/* Image courante */}
                  <img
                    src={carouselData[currentSlideIndex].image}
                    alt={carouselData[currentSlideIndex].title}
                    className="w-full h-full object-contain transition-all duration-500"
                  />

                  {/* Overlay pour le texte */}

                  {/* Boutons de navigation */}
                  <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                    <button
                      onClick={prevSlide}
                      className="p-1 bg-black/30 rounded-full backdrop-blur-sm text-white hover:bg-white/50 transition"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                    <button
                      onClick={nextSlide}
                      className="p-1 bg-black/30 rounded-full backdrop-blur-sm text-white hover:bg-white/50 transition"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Indicateurs de diapositive */}
                <div className="flex justify-center space-x-2 mt-4">
                  {carouselData.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlideIndex
                          ? "w-8 bg-red-500"
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fonctionnalités clés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants pour retrouver les contacts professionnels
              dont vous avez besoin.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-md inline-block mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Recherche personnelle
              </h3>
              <p className="text-gray-600">
                Trouvez rapidement des contacts en recherchant par nom, prénom,
                ville et autres critères personnalisés.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 text-green-600 rounded-md inline-block mb-4">
                <Map className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Recherche géographique
              </h3>
              <p className="text-gray-600">
                Filtrez vos recherches par emplacements spécifiques grâce à
                notre interface de carte interactive.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-md inline-block mb-4">
                <FlaskConical className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Ghost Mail Hunter
              </h3>
              <p className="text-gray-600">
                Découvrez des emails professionnels cachés que personne d'autre
                ne peut trouver.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-md inline-block mb-4">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Company Trace
              </h3>
              <p className="text-gray-600">
                Identifiez rapidement les emails valides pour n'importe quelle
                entreprise en utilisant le domaine.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-md inline-block mb-4">
                <BarChart2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Tableaux et graphiques
              </h3>
              <p className="text-gray-600">
                Analysez vos données avec des visualisations claires et
                exportez-les facilement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-md inline-block mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                B2B Search
              </h3>
              <p className="text-gray-600">
                Des outils spécialisés pour la prospection B2B et le
                développement commercial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos solutions pour améliorer votre stratégie de
              prospection commerciale.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-gray-200 rounded-md">
              <button
                onClick={() => setActiveTab("features")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "features"
                    ? "bg-white shadow-sm"
                    : "text-gray-600"
                }`}
              >
                Fonctionnalités
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "details"
                    ? "bg-white shadow-sm"
                    : "text-gray-600"
                }`}
              >
                Détails techniques
              </button>
              <button
                onClick={() => setActiveTab("usage")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "usage" ? "bg-white shadow-sm" : "text-gray-600"
                }`}
              >
                Utilisation
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Personal Search
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Trouvez rapidement des emails valides à partir de n'importe
                    quelle entreprise
                  </p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-md">
                  <Search className="h-6 w-6" />
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Recherche par nom, prénom, ville</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Options de recherche exacte ou approximative</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Filtres avancés disponibles</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Interface intuitive et rapide</span>
                </li>
              </ul>

              <button
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
                style={gradientStyle}
              >
                Essayer maintenant
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Map Search
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Recherchez par localisation et genre pour cibler précisément
                    vos prospects
                  </p>
                </div>
                <div className="p-3 bg-green-100 text-green-600 rounded-md">
                  <Map className="h-6 w-6" />
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Interface de carte interactive</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Sélection multiple de zones géographiques</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Filtrage par genre et autres critères</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Visualisation claire des zones sélectionnées</span>
                </li>
              </ul>

              <button
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
                style={gradientStyle}
              >
                Essayer maintenant
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Ghost Mail Hunter
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Découvrez des emails professionnels cachés que personne
                    d'autre ne peut trouver
                  </p>
                </div>
                <div className="p-3 bg-purple-100 text-purple-600 rounded-md">
                  <FlaskConical className="h-6 w-6" />
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Algorithmes avancés de détection d'emails</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Recherche par nom et domaine d'entreprise</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Technologie de validation en temps réel</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Découverte d'emails difficiles à trouver</span>
                </li>
              </ul>

              <button
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
                style={gradientStyle}
              >
                Essayer maintenant
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Company Trace
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Identifiez rapidement les emails valides pour n'importe
                    quelle entreprise
                  </p>
                </div>
                <div className="p-3 bg-orange-100 text-orange-600 rounded-md">
                  <Building className="h-6 w-6" />
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Recherche par domaine d'entreprise</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Validation automatique des emails trouvés</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Identification des modèles d'emails d'entreprise</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Export facile des résultats</span>
                </li>
              </ul>

              <button
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
                style={gradientStyle}
              >
                Essayer maintenant
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16 bg-gradient-to-r from-red-600 to-red-500 text-white"
        style={gradientStyle}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">+2M</div>
              <p>Emails trouvés</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">+500</div>
              <p>Clients satisfaits</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">97%</div>
              <p>Taux de validité</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">+50</div>
              <p>Pays couverts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ce que nos clients disent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez pourquoi les professionnels font confiance à DataPull
              pour leurs besoins de prospection B2B.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="text-gray-600 mb-6">
                "DataPull nous a permis d'identifier des prospects de qualité et
                d'augmenter significativement notre taux de conversion. Un outil
                indispensable pour notre équipe commerciale."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Marie Dubois</h4>
                  <p className="text-gray-600">
                    Directrice Commerciale, TechCorp
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="text-gray-600 mb-6">
                "La fonction Ghost Mail Hunter est impressionnante. Nous
                trouvons des contacts que nos concurrents ne peuvent pas
                atteindre. Un véritable avantage concurrentiel."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Thomas Martin</h4>
                  <p className="text-gray-600">CEO, StartupInnovate</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="text-gray-600 mb-6">
                "L'interface Map Search nous a permis de cibler très précisément
                nos campagnes par région. L'efficacité de notre approche
                commerciale a été multipliée par trois."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Laurent Petit</h4>
                  <p className="text-gray-600">
                    Responsable Marketing, GlobalConnect
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Formules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le forfait qui correspond à vos besoins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Starter
                </h3>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-gray-900">29€</span>
                  <span className="text-gray-600 ml-2">/mois</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Pour les entrepreneurs individuels
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>100 recherches / mois</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Personal Search</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Export CSV</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Ghost Mail Hunter</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Company Trace</span>
                </li>
              </ul>

              <button
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                style={gradientStyle}
              >
                Commencer
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-red-500 transform md:-translate-y-4 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Populaire
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Professional
                </h3>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-gray-900">89€</span>
                  <span className="text-gray-600 ml-2">/mois</span>
                </div>
                <p className="text-gray-600 mt-2">Pour les équipes de vente</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>500 recherches / mois</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Toutes les fonctionnalités Starter</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Ghost Mail Hunter</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Map Search</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>API Access</span>
                </li>
              </ul>

              <button
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                style={gradientStyle}
              >
                Commencer
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-gray-900">249€</span>
                  <span className="text-gray-600 ml-2">/mois</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Pour les grandes entreprises
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Recherches illimitées</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Toutes les fonctionnalités Professional</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Company Trace</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>API Access</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Support dédié</span>
                </li>
              </ul>

              <button className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                Contacter l'équipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tout ce que vous devez savoir sur DataPull
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Comment fonctionne DataPull ?
              </h3>
              <p className="text-gray-600">
                DataPull utilise des algorithmes avancés pour rechercher et
                valider des adresses email professionnelles à partir de
                différentes sources. Notre technologie permet de trouver des
                emails valides avec un taux de précision de plus de 97%.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Les emails trouvés sont-ils valides ?
              </h3>
              <p className="text-gray-600">
                Oui, tous les emails découverts par DataPull sont
                automatiquement vérifiés pour s'assurer qu'ils sont valides et
                actifs. Nous garantissons un taux de validité supérieur à 97%.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Puis-je exporter mes résultats ?
              </h3>
              <p className="text-gray-600">
                Absolument ! DataPull vous permet d'exporter tous vos résultats
                au format CSV pour une utilisation facile avec vos outils de CRM
                ou d'email marketing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Qu'est-ce que Ghost Mail Hunter ?
              </h3>
              <p className="text-gray-600">
                Ghost Mail Hunter est notre technologie exclusive qui permet de
                découvrir des adresses email professionnelles cachées ou
                difficiles à trouver. Cette fonctionnalité utilise des
                algorithmes avancés pour identifier des emails que les méthodes
                traditionnelles ne peuvent pas détecter.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Est-ce que DataPull est conforme au RGPD ?
              </h3>
              <p className="text-gray-600">
                Oui, DataPull est entièrement conforme au RGPD. Nous ne
                collectons que des données professionnelles publiquement
                disponibles et nous fournissons tous les outils nécessaires pour
                respecter les obligations légales en matière de protection des
                données.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une question ? Notre équipe est là pour vous aider
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Nom complet
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    type="text"
                    id="name"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email professionnel
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    type="email"
                    id="email"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="subject">
                    Sujet
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    id="subject"
                  >
                    <option>Demande d'information</option>
                    <option>Support technique</option>
                    <option>Partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                    id="message"
                  ></textarea>
                </div>

                <button
                  className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                  style={gradientStyle}
                >
                  Envoyer le message
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nos coordonnées
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-3 bg-red-100 text-red-600 rounded-md mr-4">
                      <Mail
                        className="h-6 w-6"
                        style={{ color: "rgb(244, 84, 92)" }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email</h4>
                      <p className="text-gray-600">contact@datapull.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-red-100 text-red-600 rounded-md mr-4">
                      <Globe
                        className="h-6 w-6"
                        style={{ color: "rgb(244, 84, 92)" }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Site web</h4>
                      <p className="text-gray-600">www.datapull.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-0">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Demandez une démo
                </h3>
                <p className="text-gray-600 mb-6">
                  Découvrez comment DataPull peut transformer votre approche
                  commerciale avec une démonstration personnalisée.
                </p>
                <button className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 flex items-center justify-center">
                  Réserver une démo
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div>
              <div className="flex items-center mb-6">
                <div
                  className="text-red-500 mr-2"
                  style={{ color: "rgb(244, 84, 92)" }}
                >
                  <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="8" rx="4" fill="currentColor" />
                    <rect
                      y="16"
                      width="40"
                      height="8"
                      rx="4"
                      fill="currentColor"
                    />
                    <rect
                      y="32"
                      width="40"
                      height="8"
                      rx="4"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span
                    className="text-xl font-bold text-red-500"
                    style={{ color: "rgb(244, 84, 92)" }}
                  >
                    Data
                  </span>
                  <span className="text-xl font-bold">Pull</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                La solution avancée pour trouver des emails professionnels
                valides en quelques clics.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Solutions</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Personal Search
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Map Search
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Ghost Mail Hunter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Company Trace
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    B2B Search
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Entreprise</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Partenaires
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Presse
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Statut
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400">
                  © 2025 DataPull. Tous droits réservés.
                </p>
              </div>

              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  Confidentialité
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Conditions
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
