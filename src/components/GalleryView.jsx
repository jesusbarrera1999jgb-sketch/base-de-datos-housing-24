import React from 'react';

export const GalleryView = ({ apartment, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 animate-in slide-in-from-right duration-300 overflow-y-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Volver</span>
        </button>

        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Galería Multimedia</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Departamento {apartment.unitNumber}</p>
        </header>

        <section className="mb-16">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-slate-800 dark:bg-slate-200 rounded-full"></span>
            Residentes y Personal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {apartment.residents.map((res) => (
              <div key={res.id} className="space-y-6">
                <div className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-xl ring-1 ring-slate-100 dark:ring-slate-800">
                  {res.imageUrl ? (
                    <img src={res.imageUrl} alt={res.firstName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-4xl font-black">{res.firstName[0]}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <p className="text-white font-bold text-lg">{res.firstName} {res.lastName}</p>
                    <p className="text-white/70 text-[10px] tracking-widest uppercase font-bold">Residente</p>
                  </div>
                </div>

                <div className="space-y-4 pl-4">
                  {[...res.domesticStaff, ...res.permanentVisitors].map((p, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-slate-300 dark:group-hover:ring-slate-600 transition-all shrink-0">
                        {p.imageUrl ? <img src={p.imageUrl} alt={p.firstName} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">{p.firstName[0]}</div>}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{p.firstName} {p.lastName}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Autorizado</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-slate-800 dark:bg-slate-200 rounded-full"></span>
            Vehículos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartment.residents.flatMap(res => res.vehicles).map((v, i) => (
              <div key={i} className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  {v.imageUrl && <img src={v.imageUrl} alt={v.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white">{v.model}</h4>
                    <span className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-mono font-bold rounded-lg uppercase">
                      {v.plate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};