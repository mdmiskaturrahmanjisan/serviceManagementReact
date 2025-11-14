import { useState, useEffect } from "react";
import { useHome } from "../../hooks/useHome";

export default function Home() {
  const { banners, categories, services, loading } = useHome();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const currentBanner = banners[currentBannerIndex];

  if (loading)
  return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );


  return (
    <div className="space-y-16 py-8">

      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-6 rounded-3xl shadow-2xl">
        {/* Text */}
        <div className="space-y-6 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Welcome to Our <span className="text-blue-600">Premium</span> Service Platform
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl">
            We connect you with the highest rated local professionals to make your life easier and your home comfortable.
          </p>
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02]">
            Explore Services
          </button>
        </div>

        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl h-64 md:h-96 order-1 lg:order-2">
          <img
            src={currentBanner?.media?.[0]?.original_url || 'https://placehold.co/1000x500/818CF8/ffffff?text=Service+Site'}
            alt="Banner"
            className="w-full h-full object-cover transition-opacity duration-1000"
            key={currentBannerIndex}
          />
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentBannerIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.03] cursor-pointer border-t-4 border-blue-500">
              <img 
                src={cat.media?.[0]?.original_url || 'https://placehold.co/150x150/D1D5DB/1F2937?text=?'} 
                alt={cat.title} 
                className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border-2 border-gray-100"
                onError={(e)=>{e.target.onerror=null;e.target.src='https://placehold.co/150x150/D1D5DB/1F2937?text=?';}}
              />
              <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv) => (
            <div key={srv.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition duration-300 transform hover:shadow-2xl hover:-translate-y-1">
              <img 
                src={srv.media?.[0]?.original_url || 'https://placehold.co/400x240/4B5563/ffffff?text=Service'} 
                alt={srv.title} 
                className="w-full h-40 object-cover"
                onError={(e)=>{e.target.onerror=null;e.target.src='https://placehold.co/400x240/4B5563/ffffff?text=Service';}}
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{srv.title}</h3>
                {srv.price && <p className="text-2xl font-extrabold text-blue-600">${srv.price}<span className="text-base font-normal text-gray-500">/starting</span></p>}
                {srv.short_description && <p className="text-sm text-gray-600">{srv.short_description}</p>}
                <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm pt-2">
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
