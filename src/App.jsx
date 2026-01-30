
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

  // Apply dark mode class to html element
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

  const handleEditBuildingPhoto = () => {
    const newUrl = prompt('Ingresa la URL de la nueva foto del edificio:', data.heroImageUrl);
    if (newUrl) {
      setData({ ...data, heroImageUrl: newUrl });
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true);
    });
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
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white dark:text-slate-900 font-bold text-lg">H</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 hidden sm:block">
              Housing <span className="text-slate-400 dark:text-slate-500">24</span>
            </h1>
          </div>

          <SearchBar 
            data={data} 
            onSelectApartment={handleSelectApartment}
            onSelectFloor={handleSelectFloor}
          />

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button 
              onClick={handleCopyLink}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              title="Copiar Link de Acceso"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <div className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
              {role === 'admin' ? 'Administrador' : 'Invitado'}
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Cerrar Sesión"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-10">
        <div className="relative h-72 w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl group">
           <img src={data.heroImageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Building" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 dark:from-slate-950 via-slate-900/30 to-transparent flex items-end p-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-6">
                <div className="animate-in slide-in-from-left duration-700">
                  <h2 className="text-5xl font-black text-white mb-3 tracking-tighter">Edificio Central</h2>
                  <p className="text-slate-200 dark:text-slate-300 max-w-2xl text-base font-medium leading-relaxed">
                    Panel de control interactivo. Navegue por los pisos para gestionar la información de residentes, 
                    vehículos autorizados y visitas permanentes.
                  </p>
                </div>
                {role === 'admin' && (
                  <button 
                    onClick={handleEditBuildingPhoto}
                    className="px-6 py-3 bg-white dark:bg-slate-100 text-slate-900 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 group/btn active:scale-95"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover/btn:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Editar Portada
                  </button>
                )}
              </div>
           </div>
        </div>

        <div className="space-y-12">
          {sortedFloors.map((floor) => (
            <section key={floor.level} id={`floor-section-${floor.level}`} className="relative scroll-mt-24">
              <div className="flex items-baseline gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 transition-colors">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{floor.label}</h3>
                <span className="text-sm font-medium text-slate-400 dark:text-slate-600 uppercase tracking-widest">Nivel 0{floor.level}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {floor.apartments.map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => setSelectedApartment(apt)}
                    className={`group relative flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 ${
                      selectedApartment?.id === apt.id 
                        ? 'bg-white dark:bg-slate-800 border-slate-900 dark:border-white ring-2 ring-slate-900 dark:ring-white shadow-xl scale-105 z-10' 
                        : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors mb-2">
                      {apt.unitNumber}
                    </span>
                    <div className="flex -space-x-2">
                      {apt.residents.slice(0, 3).map((r, i) => (
                        <div 
                          key={i} 
                          className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] overflow-hidden"
                        >
                          {r.imageUrl ? (
                             <img src={r.imageUrl} alt={r.firstName} className="w-full h-full object-cover" />
                          ) : (
                             <span className="text-slate-500 font-bold">{r.firstName[0]}</span>
                          )}
                        </div>
                      ))}
                      {apt.residents.length > 3 && (
                        <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-400">
                          +{apt.residents.length - 3}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <ApartmentModal 
        apartment={selectedApartment} 
        role={role}
        onClose={() => setSelectedApartment(null)} 
        onUpdateApartment={handleUpdateApartment}
        onOpenGallery={(apt) => {
          setSelectedApartment(null);
          setGalleryApartment(apt);
        }}
      />

      {galleryApartment && (
        <GalleryView 
          apartment={galleryApartment} 
          onBack={() => setGalleryApartment(null)} 
        />
      )}

      <Toast 
        message="Link copiado al portapapeles" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-3 px-6 text-xs text-slate-400 flex justify-between items-center z-30 transition-colors">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 
            Sistema en Línea
          </span>
          <span className="hidden sm:inline">V 1.0.5</span>
        </div>
        <div className="font-mono flex gap-4 uppercase font-bold text-[9px] tracking-widest">
          <span>{role === 'admin' ? 'Admin Mode' : 'Guest Mode'}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
