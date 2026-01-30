
import React, { useState } from 'react';
import { Resident, UserRole, Vehicle, Personnel } from '../types';

interface ResidentCardProps {
  resident: Resident;
  role: UserRole;
  onUpdate: (updatedResident: Resident) => void;
  onDelete: () => void;
}

export const ResidentCard: React.FC<ResidentCardProps> = ({ resident, role, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingBase, setIsEditingBase] = useState(false);
  
  const isAdmin = role === 'admin';

  const updateField = (field: keyof Resident, value: any) => {
    onUpdate({ ...resident, [field]: value });
  };

  const handleAddVehicle = () => {
    const model = prompt('Modelo del vehículo:');
    const plate = prompt('Patente/Dominio:');
    if (model && plate) {
      const newVehicles = [...resident.vehicles, { model, plate, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop' }];
      updateField('vehicles', newVehicles);
    }
  };

  const handleAddStaff = () => {
    const firstName = prompt('Nombre del personal:');
    const lastName = prompt('Apellido:');
    const dni = prompt('DNI (Opcional):') || '';
    if (firstName && lastName) {
      const newStaff = [...resident.domesticStaff, { firstName, lastName, dni, imageUrl: `https://i.pravatar.cc/300?u=staff-${Date.now()}` }];
      updateField('domesticStaff', newStaff);
    }
  };

  const handleAddVisitor = () => {
    const firstName = prompt('Nombre del visitante:');
    const lastName = prompt('Apellido:');
    const dni = prompt('DNI (Opcional):') || '';
    if (firstName && lastName) {
      const newVisitors = [...resident.permanentVisitors, { firstName, lastName, dni, imageUrl: `https://i.pravatar.cc/300?u=visitor-${Date.now()}` }];
      updateField('permanentVisitors', newVisitors);
    }
  };

  const removeItem = (field: 'vehicles' | 'domesticStaff' | 'permanentVisitors', index: number) => {
    if (!confirm('¿Eliminar este registro completo?')) return;
    const newList = [...resident[field]];
    newList.splice(index, 1);
    updateField(field, newList);
  };

  const removeItemPhoto = (field: 'vehicles' | 'domesticStaff' | 'permanentVisitors', index: number) => {
    if (!confirm('¿Eliminar solo la foto de este registro?')) return;
    const newList = [...resident[field]];
    newList[index] = { ...newList[index], imageUrl: undefined };
    updateField(field, newList);
  };

  const handleChangePhoto = () => {
    const url = prompt('URL de la foto (debe ser un link de imagen):', resident.imageUrl);
    if (url !== null) updateField('imageUrl', url || undefined);
  };

  const handleRemovePhoto = () => {
    if (confirm('¿Deseas eliminar la foto del residente?')) {
      updateField('imageUrl', undefined);
    }
  };

  // Clase común para inputs de alta visibilidad
  const inputClassName = "px-3 py-1.5 text-sm font-semibold border border-slate-300 dark:border-slate-500 bg-white dark:bg-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full";

  return (
    <div 
      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen 
          ? 'bg-white dark:bg-slate-800 shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 border-slate-300 dark:border-slate-600' 
          : 'bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md border-transparent cursor-pointer'
      }`}
    >
      <div 
        className="p-5 flex items-center justify-between"
        onClick={() => !isEditingBase && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="relative group/photo shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800">
              {resident.imageUrl ? (
                <img src={resident.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            {isAdmin && isOpen && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleChangePhoto(); }}
                  className="p-1 text-white hover:text-emerald-400"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                {resident.imageUrl && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRemovePhoto(); }}
                    className="p-1 text-white hover:text-red-400"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {isEditingBase ? (
              <div className="flex flex-wrap gap-2 animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <input 
                    value={resident.firstName} 
                    onChange={e => updateField('firstName', e.target.value)}
                    placeholder="Nombres"
                    className={inputClassName}
                  />
                  <input 
                    value={resident.lastName} 
                    onChange={e => updateField('lastName', e.target.value)}
                    placeholder="Apellidos"
                    className={inputClassName}
                  />
                  <div className="flex gap-2">
                    <input 
                      value={resident.dni} 
                      onChange={e => updateField('dni', e.target.value)}
                      placeholder="DNI"
                      className={inputClassName}
                    />
                    <button 
                      onClick={() => setIsEditingBase(false)} 
                      className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-4 py-1.5 rounded-xl text-xs font-black shadow-lg"
                    >
                      LISTO
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="truncate">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">{resident.firstName} {resident.lastName}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                  DNI: {resident.dni || 'No registrado'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <div className="flex items-center gap-1 opacity-60 hover:opacity-100">
               <button onClick={(e) => { e.stopPropagation(); setIsEditingBase(!isEditingBase); }} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          )}
          <svg 
            className={`w-5 h-5 text-slate-300 dark:text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900 dark:text-white' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vehicles Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">Vehículos</h5>
                {isAdmin && (
                  <button onClick={handleAddVehicle} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {resident.vehicles.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative group/item">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative group/vphoto">
                      {v.imageUrl ? <img src={v.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300">V</div>}
                      {isAdmin && v.imageUrl && (
                        <button onClick={() => removeItemPhoto('vehicles', i)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/vphoto:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{v.model}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{v.plate}</p>
                    </div>
                    {isAdmin && (
                      <button onClick={() => removeItem('vehicles', i)} className="opacity-0 group-hover/item:opacity-100 text-slate-300 hover:text-red-500 p-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Section */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 justify-between">
                Personal Doméstico
                {isAdmin && <button onClick={handleAddStaff} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>}
              </h5>
              <div className="space-y-2">
                {resident.domesticStaff.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/20 shadow-sm relative group/item">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0 overflow-hidden relative group/pphoto">
                       {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-blue-300 text-[8px]">S</div>}
                       {isAdmin && p.imageUrl && (
                         <button onClick={() => removeItemPhoto('domesticStaff', i)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/pphoto:opacity-100 transition-opacity flex items-center justify-center text-white"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} /></svg></button>
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-blue-900 dark:text-blue-200 truncate">{p.firstName} {p.lastName}</p>
                      <p className="text-[9px] text-blue-500 truncate">DNI: {p.dni || '-'}</p>
                    </div>
                    {isAdmin && <button onClick={() => removeItem('domesticStaff', i)} className="opacity-0 group-hover/item:opacity-100 text-blue-300 hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} /></svg></button>}
                  </div>
                ))}
              </div>
            </div>

            {/* Visitors Section */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 justify-between">
                Visitas Autorizadas
                {isAdmin && <button onClick={handleAddVisitor} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>}
              </h5>
              <div className="space-y-2">
                {resident.permanentVisitors.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/20 shadow-sm relative group/item">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 shrink-0 overflow-hidden relative group/viphoto">
                       {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-emerald-300 text-[8px]">V</div>}
                       {isAdmin && p.imageUrl && (
                         <button onClick={() => removeItemPhoto('permanentVisitors', i)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/viphoto:opacity-100 transition-opacity flex items-center justify-center text-white"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} /></svg></button>
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 truncate">{p.firstName} {p.lastName}</p>
                      <p className="text-[9px] text-emerald-500 truncate">DNI: {p.dni || '-'}</p>
                    </div>
                    {isAdmin && <button onClick={() => removeItem('permanentVisitors', i)} className="opacity-0 group-hover/item:opacity-100 text-emerald-300 hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} /></svg></button>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
