

import React, { useState, useEffect } from 'react';
import { HOUSING_24_DATA } from './mockData';
import ApartmentModal from './components/ApartmentModal';
import GalleryView from './components/GalleryView';
import SearchBar from './components/SearchBar';
import LoginPage from './components/LoginPage';
import Toast from './components/Toast';

const App = () => {
  const [role, setRole] = useState(null);
  const [data, setData] = useState(HOUSING_24_DATA);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [galleryApartment, setGalleryApartment] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const sortedFloors = [...data.floors].sort((a, b) => a.level - b.level);

  const handleSelectFloor = (floor) => {
    const element = document.getElementById(`floor-section-${floor.level}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectApartment = (apt) => {
    setSelectedApartment(apt);
  };

  const handleUpdateApartment = (updatedApt) => {
    const newData = {
      ...data,
      floors: data.floors.map(f => ({
        ...f,
        apartments: f.apartments.map(a => a.id === updatedApt.id ? updatedApt : a)
      }))
    };
    setData(newData);
    setSelectedApartment(updatedApt);
  };

  const handleLogout = () => {
    setRole(null);
    setSelectedApartment(null);
    setGalleryApartment(null);
  };

  if (!role) {
    return (
      <LoginPage 
        onLogin={setRole} 
        backgroundUrl={data.heroImageUrl} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-300">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-slate-900 font-bold text-lg">H</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Housing 24</h1>
          </div>

          <SearchBar 
            data={data} 
            onSelectApartment={handleSelectApartment}
            onSelectFloor={handleSelectFloor}
          />

          <div className="flex items-center gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-10">
        <div className="space-y-12">
          {sortedFloors.map((floor) => (
            <section key={floor.level} id={`floor-section-${floor.level}`} className="relative scroll-mt-24">
              <div className="flex items-baseline gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                <h3 className="text-2xl font-bold">{floor.label}</h3>
                <span className="text-sm text-slate-400">Nivel 0{floor.level}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {floor.apartments.map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => setSelectedApartment(apt)}
                    className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all"
                  >
                    <span className="text-3xl font-black mb-2">{apt.unitNumber}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {selectedApartment && (
        <ApartmentModal 
          apartment={selectedApartment} 
          role={role}
          onClose={() => setSelectedApartment(null)} 
          onUpdateApartment={handleUpdateApartment}
        />
      )}
      
      <Toast message="Cambio realizado" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default App;