
import React, { useState, useMemo } from 'react';
import { HOUSING_24_DATA } from './mockData';
import { SearchBar } from './components/SearchBar';
import { GalleryView } from './components/GalleryView';
import { ApartmentModal } from './components/ApartmentModal';
import { LoginPage } from './components/LoginPage';
import { Toast } from './components/Toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState(HOUSING_24_DATA);

  const handleLogin = (userRole) => {
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const handleUpdateApartment = (updatedApt) => {
    const newData = {
      ...data,
      floors: data.floors.map(floor => ({
        ...floor,
        apartments: floor.apartments.map(apt => 
          apt.id === updatedApt.id ? updatedApt : apt
        )
      }))
    };
    setData(newData);
    setSelectedApartment(updatedApt);
    setShowToast(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white dark:text-slate-900 font-black text-xl">H</span>
            </div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white hidden sm:block">
              {data.name}
            </h1>
          </div>
          
          <SearchBar 
            data={data} 
            onSelectApartment={setSelectedApartment}
            onSelectFloor={setSelectedFloor}
          />

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {role === 'admin' ? 'Administrador' : 'Seguridad'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-2xl mb-8 group">
            <img 
              src={data.heroImageUrl} 
              alt={data.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h2 className="text-4xl font-black text-white mb-2">{data.name}</h2>
              <p className="text-slate-200 font-medium">Panel de Gestión Residencial</p>
            </div>
          </div>

          <div className="space-y-12">
            {data.floors.map((floor) => (
              <section key={floor.level} className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white shrink-0">
                    {floor.label}
                  </h3>
                  <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {floor.apartments.map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => setSelectedApartment(apt)}
                      className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
                    >
                      <span className="text-3xl font-black mb-2 text-slate-800 dark:text-white">{apt.unitNumber}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Ver detalles</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
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

      <Toast 
        message="Cambio realizado" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}

export default App;