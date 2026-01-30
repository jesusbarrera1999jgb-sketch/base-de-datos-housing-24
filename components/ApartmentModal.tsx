
import React, { useState } from 'react';
import { Apartment, Resident, UserRole } from '../types';
import { ResidentCard } from './ResidentCard';

interface ApartmentModalProps {
  apartment: Apartment | null;
  role: UserRole;
  onClose: () => void;
  onOpenGallery: (apt: Apartment) => void;
  onUpdateApartment: (apt: Apartment) => void;
}

export const ApartmentModal: React.FC<ApartmentModalProps> = ({ apartment, role, onClose, onOpenGallery, onUpdateApartment }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newRes, setNewRes] = useState({ firstName: '', lastName: '', dni: '' });

  if (!apartment) return null;

  const handleAddResident = () => {
    if (!newRes.firstName || !newRes.lastName) return;
    
    const resident: Resident = {
      id: `res-${Date.now()}`,
      firstName: newRes.firstName,
      lastName: newRes.lastName,
      dni: newRes.dni,
      imageUrl: `https://i.pravatar.cc/300?u=${Date.now()}`,
      vehicles: [],
      domesticStaff: [],
      permanentVisitors: []
    };

    const updatedApt = {
      ...apartment,
      residents: [...apartment.residents, resident]
    };
    
    onUpdateApartment(updatedApt);
    setIsAdding(false);
    setNewRes({ firstName: '', lastName: '', dni: '' });
  };

  const handleUpdateResident = (updatedResident: Resident) => {
    const updatedApt = {
      ...apartment,
      residents: apartment.residents.map(r => r.id === updatedResident.id ? updatedResident : r)
    };
    onUpdateApartment(updatedApt);
  };

  const handleDeleteResident = (resId: string) => {
    if (!confirm('¿Está seguro de eliminar a este residente?')) return;
    const updatedApt = {
      ...apartment,
      residents: apartment.residents.filter(r => r.id !== resId)
    };
    onUpdateApartment(updatedApt);
  };

  const inputClassName = "w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-500 bg-white dark:bg-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Depto {apartment.unitNumber}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Gestión Residencial</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md rounded-2xl transition-all text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Residentes</h3>
            <div className="flex gap-2">
              {role === 'admin' && (
                <button 
                  onClick={() => setIsAdding(!isAdding)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all text-xs font-bold border shadow-sm ${
                    isAdding ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                  }`}
                >
                  {isAdding ? 'Cancelar' : 'Nuevo'}
                </button>
              )}
              <button 
                onClick={() => onOpenGallery(apartment)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-2xl transition-all text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                Galería
              </button>
            </div>
          </div>

          {isAdding && (
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 space-y-4 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  placeholder="Nombres"
                  value={newRes.firstName}
                  onChange={e => setNewRes({...newRes, firstName: e.target.value})}
                  className={inputClassName}
                />
                <input 
                  placeholder="Apellidos"
                  value={newRes.lastName}
                  onChange={e => setNewRes({...newRes, lastName: e.target.value})}
                  className={inputClassName}
                />
                <input 
                  placeholder="DNI (Opcional)"
                  value={newRes.dni}
                  onChange={e => setNewRes({...newRes, dni: e.target.value})}
                  className={inputClassName + " sm:col-span-2"}
                />
              </div>
              <button onClick={handleAddResident} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors text-sm shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40">
                Añadir Residente
              </button>
            </div>
          )}

          <div className="space-y-4">
            {apartment.residents.map((resident) => (
              <ResidentCard 
                key={resident.id} 
                resident={resident} 
                role={role}
                onUpdate={handleUpdateResident}
                onDelete={() => handleDeleteResident(resident.id)}
              />
            ))}
          </div>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end transition-colors">
           <button onClick={onClose} className="px-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all font-bold text-sm">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
