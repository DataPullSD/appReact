import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Button,
} from "@material-tailwind/react";
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  ChartBarIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

// Define the keyframes animation in a style tag
const animationStyles = `
  @keyframes fadeInFromLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInFromRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInFromBottom {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-from-left {
    animation: fadeInFromLeft 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  
  .animate-from-right {
    animation: fadeInFromRight 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  
  .animate-from-bottom {
    animation: slideInFromBottom 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  
  .staggered-delay-1 {
    animation-delay: 0.1s;
  }
  
  .staggered-delay-2 {
    animation-delay: 0.2s;
  }
  
  .staggered-delay-3 {
    animation-delay: 0.3s;
  }
`;

export function Home() {
  const [activeTab, setActiveTab] = useState(null); // null, 'b2b', or 'b2c'
  const [animateItems, setAnimateItems] = useState(false);
  const [animateSolutions, setAnimateSolutions] = useState(false);
  const gradientStyle = { background: "linear-gradient(135deg, #b24592 0%, #f15f79 100%)" };
  const navigate = useNavigate();

  // Initial animation trigger for main cards
  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateItems(true);
  }, []);

  // Separate animation for solution cards
  useEffect(() => {
    if (activeTab) {
      // Always start with animation off when tab changes
      setAnimateSolutions(false);
      
      // Use a slightly longer timeout to ensure the opacity:0 takes effect first
      const timer = setTimeout(() => setAnimateSolutions(true), 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const b2bSolutions = [
    {
      id: 'ghost-mail',
      icon: <EnvelopeIcon className="h-14 w-14 text-pink-500" />,
      title: 'Ghost Mail Hunter',
      titleSplit: ['Ghost', 'Mail Hunter'],
      description: 'Looking for an email? We will hunt it down for you. Our advanced algorithms scan databases and the web to find the most accurate contact information for your target audience.',
      path: '/gMail'
    },
    {
      id: 'company-trace',
      icon: <MagnifyingGlassIcon className="h-14 w-14 text-pink-500" />,
      title: 'Company Trace',
      description: 'Generate company emails on the fly. Quickly access corporate contact patterns and generate likely email addresses for any company. Perfect for outreach and sales campaigns.',
      path: '/company-trace'
    },
    {
    id: 'map-sniffer',
    icon: <MapIcon className="h-14 w-14 text-pink-500" />,
    title: 'MapSniffer',
    description: 'Discover businesses geographically with our interactive map interface. Search, filter, and locate companies based on location, industry, and more, similar to Google Maps but specialized for B2B prospecting.',
    path: '/B2BMap'
  }
  ];

  const b2cSolutions = [
   {
    id: 'phonora-map',
    icon: <PhoneIcon className="h-14 w-14 text-pink-500" />,
    title: 'Phonora Map Search',
    description: 'Find contacts quickly with our powerful map-based search engine. Visualize your contacts geographically and discover connections based on location.',
    path: '/map-search'
  },
  {
    id: 'phonora-advanced',
    icon: <MagnifyingGlassIcon className="h-14 w-14 text-pink-500" />,
    title: 'Phonora Advanced Search',
    description: 'Power up your contact search with advanced filtering, custom fields, and instant results across all your contact data.',
    path: '/personal-search'
  },
  {
    id: 'vizora',
    icon: <ChartBarIcon className="h-14 w-14 text-pink-500" />,
    title: 'Vizora',
    description: 'Transform your contact data into meaningful insights with powerful visualization tools. Create charts, graphs, and interactive dashboards to better understand your network.',
    path: '/statistics'
  }
  ];

  const toggleSolutionsView = (type) => {
    // If closing the current tab
    if (activeTab === type) {
      setAnimateSolutions(false); // First turn off animations
      // Then after a brief delay, close the panel
      setTimeout(() => {
        setActiveTab(null);
      }, 300);
    } else {
      // If opening a new tab or switching tabs
      if (activeTab) {
        // If another tab is open, first turn off animations
        setAnimateSolutions(false);
        // Then close it and open the new one
        setTimeout(() => {
          setActiveTab(type);
        }, 300);
      } else {
        // If no tab is open, just open the new one directly
        setActiveTab(type);
      }
    }
  };

  return (
    <div className="mt-12">
      {/* Add the keyframes animation style */}
      <style>{animationStyles}</style>
      
      {/* Solutions Section */}
      <div className="mb-10 rounded-xl p-8" style={gradientStyle}>
        <div className={`mb-12 text-center ${animateItems ? 'animate-from-bottom' : 'opacity-0'}`}>
          <Typography variant="h2" color="white" className="font-bold mb-2">
            Data Management Made Simple
          </Typography>
          <Typography color="white" className="max-w-3xl mx-auto">
            DataPull helps you organize, find, and visualize your contact data with ease. Just upload your data,
            and our system takes care of the rest, providing you with a comprehensive dashboard to manage all
            your contacts efficiently.
          </Typography>
        </div>

        {/* B2B and B2C Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
          {/* B2B Solution Card */}
          <Card className={`bg-white shadow-lg rounded-lg overflow-hidden ${animateItems ? 'animate-from-left' : 'opacity-0'}`}>
            <div className="p-6 text-center">
              <div className="rounded-full w-16 h-16 bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-500" />
              </div>
              <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                B2B Solutions
              </Typography>
              <Typography className="text-blue-gray-600 mb-6">
                Enterprise-grade data management tools for businesses. Scale your operations with our advanced features for team collaboration.
              </Typography>
              <Button 
                variant="filled" 
                style={gradientStyle}              
                className="w-full py-3 rounded-full"
                onClick={() => toggleSolutionsView('b2b')}
              >
                {activeTab === 'b2b' ? 'HIDE OPTIONS' : 'ACCESS NOW'}
              </Button>
            </div>
          </Card>

          {/* B2C Solution Card */}
          <Card className={`bg-white shadow-lg rounded-lg overflow-hidden ${animateItems ? 'animate-from-right' : 'opacity-0'}`}>
            <div className="p-6 text-center">
              <div className="rounded-full w-16 h-16 bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-purple-500" />
              </div>
              <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                B2C Solutions
              </Typography>
              <Typography className="text-blue-gray-600 mb-6">
                Individual-focused contact management that simplifies your personal network. Affordable plans for freelancers and individuals.
              </Typography>
              <Button 
                variant="filled" 
                style={gradientStyle}
                className="w-full py-3 rounded-full"
                onClick={() => toggleSolutionsView('b2c')}
              >
                {activeTab === 'b2c' ? 'HIDE OPTIONS' : 'ACCESS NOW'}
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Display Solutions Based on Selection */}
        {activeTab && (
          <div className="mt-12 transition-opacity duration-100">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 max-w-6xl mx-auto">
              <Typography variant="h3" color="white" className="font-bold mb-8 text-center">
                {activeTab === 'b2b' ? 'Business Solutions' : 'Personal Solutions'}
              </Typography>
              
              <div className="space-y-10">
                {activeTab === 'b2b' && b2bSolutions.map((solution, index) => (
  <Card 
    key={solution.id} 
    className={`bg-white shadow-lg rounded-lg overflow-hidden ${
      animateSolutions ? (index % 2 === 0 ? 'animate-from-left' : 'animate-from-right') : 'opacity-0'
    } staggered-delay-${index + 1}`}
    style={{ visibility: animateSolutions ? 'visible' : 'hidden' }}
  >
    <div className="flex flex-col md:flex-row items-center p-6">
      <div className="md:mr-8 flex flex-col items-center md:w-1/3 mb-6 md:mb-0">
        <div className="mb-4">{solution.icon}</div>
        {solution.titleSplit ? (
          <div className="text-center">
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {solution.titleSplit[0]}
            </Typography>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              {solution.titleSplit[1]}
            </Typography>
          </div>
        ) : (
          <Typography variant="h4" color="blue-gray" className="font-bold text-center">
            {solution.title}
          </Typography>
        )}
      </div>
      
      <div className="md:w-2/3 text-center md:text-left">
        <Typography className="text-blue-gray-600 mb-6">
          {solution.description}
        </Typography>
        <Button 
          variant="filled" 
          style={gradientStyle}
          className="px-8 py-2 rounded-full"
          onClick={() => navigate(solution.path)}
        >
          ACCESS NOW
        </Button>
      </div>
    </div>
  </Card>
))}
                
                {activeTab === 'b2c' && b2cSolutions.map((solution, index) => (
                  <Card 
                    key={solution.id} 
                    className={`bg-white shadow-lg rounded-lg overflow-hidden ${
                      animateSolutions ? (index % 2 === 0 ? 'animate-from-left' : 'animate-from-right') : 'opacity-0'
                    } staggered-delay-${index + 1}`}
                    style={{ visibility: animateSolutions ? 'visible' : 'hidden' }}
                  >
                    <div className="flex flex-col md:flex-row items-center p-6">
                      <div className="md:mr-8 flex flex-col items-center md:w-1/3 mb-6 md:mb-0">
                        <div className="mb-4">{solution.icon}</div>
                        <Typography variant="h4" color="blue-gray" className="font-bold text-center">
                          {solution.title}
                        </Typography>
                      </div>
                      
                      <div className="md:w-2/3 text-center md:text-left">
                        <Typography className="text-blue-gray-600 mb-6">
                          {solution.description}
                        </Typography>
                        <Button 
                          variant="filled" 
                          style={gradientStyle}
                          className="px-8 py-2 rounded-full"
                          onClick={() => navigate(solution.path)}
                        >
                          ACCESS NOW
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>  
    </div>
  );
}

export default Home;