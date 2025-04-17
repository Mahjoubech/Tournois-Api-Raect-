import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AppContext);
  const [tournois, setTournois] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  async function getTournois() {
    const res = await fetch('/api/tournois', {
      method: 'GET',
    });
    if (res.ok) {
      const data = await res.json();
      setTournois(data);
    }
  }

  useEffect(() => {
    getTournois();
  }, []);

  // Dynamic sports-themed background images
  const cardBackgrounds = [
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800", // Soccer/Football
    "https://images.unsplash.com/photo-1577223686772-3f6c2a561e93?w=800", // Basketball
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800", // Stadium
    "https://images.unsplash.com/photo-1590062115058-6b247397b352?w=800", // Tennis
    "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800", // Gaming
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-slate-900/90 z-10"></div>
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src="/tournament-background.mp4" type="video/mp4" />
            {/* Fallback image if video fails to load */}
            <img 
              src="https://images.unsplash.com/photo-1577223686772-3f6c2a561e93" 
              alt="Tournament"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-title">
            Welcome to Elite
            <span className="text-blue-400"> Tournaments</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl animate-fade-in">
            Join the competition, embrace the challenge
          </p>
        </div>
      </div>

      {/* Tournament Cards Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['all', 'upcoming', 'live', 'completed'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                relative px-6 py-2 rounded-full text-sm font-medium 
                transition-all duration-300 transform hover:scale-105
                overflow-hidden group
                ${activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}
              `}
            >
              <span className="relative z-10">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className={`
                absolute inset-0 bg-blue-500 transform scale-x-0 
                transition-transform duration-300 origin-left
                group-hover:scale-x-100
                ${activeCategory === category ? 'scale-x-100' : ''}
              `}></div>
            </button>
          ))}
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournois.map((tournoi, index) => (
            <div
              key={tournoi.id}
              className="tournament-card"
              onMouseEnter={() => setHoveredCard(tournoi.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-full bg-slate-800 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent z-10"></div>
                  <img
                    src={cardBackgrounds[index % cardBackgrounds.length]}
                    alt={tournoi.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 p-6 h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                      Live Now
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(tournoi.start_date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Tournament Info */}
                  <h3 className="text-2xl font-bold text-white mb-2 tournament-title">
                    {tournoi.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {tournoi.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {tournoi.participants || '16'} Teams
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {tournoi.status || 'Active'}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-auto">
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progress</span>
                      <span>60%</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`
                    grid grid-cols-2 gap-4 mt-6 transition-all duration-300
                    ${hoveredCard === tournoi.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}>
                    <Link
                      to={`/tournament/${tournoi.id}/bracket`}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700
                               text-white rounded-lg font-medium transition-colors"
                    >
                      View Bracket
                    </Link>
                    <Link
                      to={`/tournament/${tournoi.id}/matches`}
                      className="flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600
                               text-white rounded-lg font-medium transition-colors"
                    >
                      Matches
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}