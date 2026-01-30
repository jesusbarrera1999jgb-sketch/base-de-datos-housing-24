import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, User, Shield, Users, Car,
  Camera, Image as ImageIcon 
} from 'lucide-react';
// Importación corregida para evitar errores de case-sensitivity en Vercel
import { ResidentCard } from './ResidentCard';

export const ApartmentModal = ({ apartment, role, onClose, onOpenGallery, onUpdateApartment }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newRes, setNewRes] = useState({ firstName: '', lastName: '', dni: '' });

  if (!apartment) return null;

  const handleAddResident = () => {
    // Validación simple para evitar registros vacíos
    if (!newRes.firstName.trim() || !newRes.lastName.trim()) {
      alert("Por favor, ingresa al menos nombre y apellido.");
      return;
    }
    
    const resident = {
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

  const handleUpdateResident = (updatedResident) => {
    const updatedApt = {
      ...apartment,
      residents: apartment.residents.map(r => r.id === updatedResident.id ? updatedResident : r)
    };
    onUpdateApartment(updatedApt);
  };

  const handleDeleteResident = (resId) => {
    if (!confirm('¿Está seguro de eliminar a este residente?')) return;
    const updatedApt = {
      ...apartment,
      residents: apartment.residents.filter(r => r.id !== resId)
    };
    onUpdateApartment(updatedApt);
  };

  const inputClassName = "w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-500 bg-white dark:bg-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Depto {apartment.unitNumber}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Gestión Residencial</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md rounded-2xl transition-all text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Residentes</h3>
            {role === 'admin' && (
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all text-xs font-bold border shadow-sm ${
                  isAdding ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                }`}
              >
                <Plus className={`w-4 h-4 transition-transform ${isAdding ? 'rotate-45' : ''}`} />
                {isAdding ? 'Cancelar' : 'Nuevo Residente'}
              </button>
            )}
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 space-y-4 mb-6">
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
                  <button onClick={handleAddResident} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200 dark:shadow-none">
                    Guardar Residente
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-4">
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

        {/* Footer */}
        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-slate-100 transition-all font-bold text-sm">
            Cerrar Gestión
          </button>
        </div>
      </motion.div>
    </div>
  );
};