
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Car, Users, Plus, Trash2, 
  Shield, Edit2, Check, Camera, 
  ChevronDown, Trash 
} from 'lucide-react';

export const ResidentCard = ({ resident, role, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingBase, setIsEditingBase] = useState(false);
  
  const isAdmin = role === 'admin';

  const updateField = (field, value) => {
    onUpdate({ ...resident, [field]: value });
  };

  const handleAddVehicle = () => {
    const model = prompt('Modelo del vehículo:');
    const plate = prompt('Patente/Dominio:');
    if (model && plate) {
      const newVehicles = [...resident.vehicles, { 
        model, 
        plate, 
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop' 
      }];
      updateField('vehicles', newVehicles);
    }
  };

  const handleAddStaff = () => {
    const firstName = prompt('Nombre del personal:');
    const lastName = prompt('Apellido:');
    const dni = prompt('DNI (Opcional):') || '';
    if (firstName && lastName) {
      const newStaff = [...resident.domesticStaff, { 
        firstName, 
        lastName, 
        dni, 
        imageUrl: `https://i.pravatar.cc/300?u=staff-${Date.now()}` 
      }];
      updateField('domesticStaff', newStaff);
    }
  };

  const handleAddVisitor = () => {
    const firstName = prompt('Nombre del visitante:');
    const lastName = prompt('Apellido:');
    const dni = prompt('DNI (Opcional):') || '';
    if (firstName && lastName) {
      const newVisitors = [...resident.permanentVisitors, { 
        firstName, 
        lastName, 
        dni, 
        imageUrl: `https://i.pravatar.cc/300?u=visitor-${Date.now()}` 
      }];
      updateField('permanentVisitors', newVisitors);
    }
  };

  const removeItem = (field, index) => {
    if (!confirm('¿Eliminar este registro completo?')) return;
    const newList = [...resident[field]];
    newList.splice(index, 1);
    updateField(field, newList);
  };

  const removeItemPhoto = (field, index) => {
    if (!confirm('¿Eliminar solo la foto de este registro?')) return;
    const newList = [...resident[field]];
    newList[index] = { ...newList[index], imageUrl: undefined };
    updateField(field, newList);
  };

  const handleChangePhoto = () => {
    const url = prompt('URL de la foto:', resident.imageUrl);
    if (url !== null) updateField('imageUrl', url || undefined);
  };

  const handleRemovePhoto = () => {
    if (confirm('¿Deseas eliminar la foto del residente?')) {
      updateField('imageUrl', undefined);
    }
  };

  const inputClassName = "px-3 py-1.5 text-sm font-semibold border border-slate-300 dark:border-slate-500 bg-white dark:bg-black text-slate-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full";

  return (
    <div className={`border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white dark:bg-slate-800 shadow-xl border-slate-300 dark:border-slate-600' : 'bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 border-transparent cursor-pointer'}`}>
      <div className="p-5 flex items-center justify-between" onClick={() => !isEditingBase && setIsOpen(!isOpen)}>
        <div className="flex items-center gap-4 flex-1">
          <div className="relative group/photo shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
              {resident.imageUrl ? (
                <img src={resident.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-slate-400" />
              )}
            </div>
            {isAdmin && isOpen && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-1">
                <button onClick={(e) => { e.stopPropagation(); handleChangePhoto(); }} className="p-1 text-white hover:text-emerald-400"><Camera className="w-4 h-4" /></button>
                {resident.imageUrl && (
                  <button onClick={(e) => { e.stopPropagation(); handleRemovePhoto(); }} className="p-1 text-white hover:text-red-400"><Trash className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {isEditingBase ? (
              <div className="flex flex-wrap gap-2" onClick={e => e.stopPropagation()}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <input value={resident.firstName} onChange={e => updateField('firstName', e.target.value)} placeholder="Nombres" className={inputClassName} />
                  <input value={resident.lastName} onChange={e => updateField('lastName', e.target.value)} placeholder="Apellidos" className={inputClassName} />
                  <div className="flex gap-2">
                    <input value={resident.dni} onChange={e => updateField('dni', e.target.value)} placeholder="DNI" className={inputClassName} />
                    <button onClick={() => setIsEditingBase(false)} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-4 py-1.5 rounded-xl text-xs font-black"><Check className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="truncate">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">{resident.firstName} {resident.lastName}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">DNI: {resident.dni || 'No registrado'}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <div className="flex items-center gap-1">
              <button onClick={(e) => { e.stopPropagation(); setIsEditingBase(!isEditingBase); }} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"><Edit2 className="w-4 h-4" /></button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
          <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900 dark:text-white' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vehículos */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehículos</h5>
                  {isAdmin && <button onClick={handleAddVehicle} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Plus className="w-3.5 h-3.5" /></button>}
                </div>
                <div className="space-y-2">
                  {resident.vehicles.map((v, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 relative group/item">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative group/vphoto">
                        {v.imageUrl ? <img src={v.imageUrl} className="w-full h-full object-cover" /> : <Car className="w-full h-full p-2 text-slate-300" />}
                        {isAdmin && v.imageUrl && (
                          <button onClick={() => removeItemPhoto('vehicles', i)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/vphoto:opacity-100 flex items-center justify-center text-white"><Trash className="w-3 h-3" /></button>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{v.model}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{v.plate}</p>
                      </div>
                      {isAdmin && <button onClick={() => removeItem('vehicles', i)} className="opacity-0 group-hover/item:opacity-100 text-slate-300 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal */}
              <div className="space-y-3">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  Personal Doméstico
                  {isAdmin && <button onClick={handleAddStaff} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Plus className="w-3.5 h-3.5" /></button>}
                </h5>
                <div className="space-y-2">
                  {resident.domesticStaff.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/20 relative group/item">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 overflow-hidden relative group/pphoto">
                        {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <Shield className="w-full h-full p-1.5 text-blue-300" />}
                        {isAdmin && p.imageUrl && (
                          <button onClick={() => removeItemPhoto('domesticStaff', i)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/pphoto:opacity-100 flex items-center justify-center text-white"><Trash className="w-3 h-3" /></button>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-blue-900 dark:text-blue-200 truncate">{p.firstName} {p.lastName}</p>
                        <p className="text-[9px] text-blue-500 truncate">DNI: {p.dni || '-'}</p>
                      </div>
                      {isAdmin && <button onClick={() => removeItem('domesticStaff', i)} className="opacity-0 group-hover/item:opacity-100 text-blue-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visitas */}
              <div className="space-y-3">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  Visitas Autorizadas
                  {isAdmin && <button onClick={handleAddVisitor} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Plus className="w-3.5 h-3.5" /></button>}
                </h5>
                <div className="space-y-2">
                  {resident.permanentVisitors.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/20 relative group/item">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden relative group/viphoto">
                        {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <Users className="w-full h-full p-1.5 text-emerald-300" />}
                        {isAdmin && p.imageUrl && (
                          <button onClick={() => removeItemPhoto('permanentVisitors', i)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/viphoto:opacity-100 flex items-center justify-center text-white"><Trash className="w-3 h-3" /></button>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 truncate">{p.firstName} {p.lastName}</p>
                        <p className="text-[9px] text-emerald-500 truncate">DNI: {p.dni || '-'}</p>
                      </div>
                      {isAdmin && <button onClick={() => removeItem('permanentVisitors', i)} className="opacity-0 group-hover/item:opacity-100 text-emerald-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};