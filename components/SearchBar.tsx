
import React, { useState, useEffect, useRef } from 'react';
import { Building, Apartment, Resident, Floor } from '../types';

interface SearchResult {
  id: string;
  type: 'Piso' | 'Departamento' | 'Persona' | 'Vehículo' | 'Dominio';
  label: string;
  sublabel?: string;
  targetApartment?: Apartment;
  targetFloor?: Floor;
}

interface SearchBarProps {
  data: Building;
  onSelectApartment: (apt: Apartment) => void;
  onSelectFloor: (floor: Floor) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ data, onSelectApartment, onSelectFloor }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    data.floors.forEach(floor => {
      if (floor.label.toLowerCase().includes(lowerQuery)) {
        results.push({ id: `floor-${floor.level}`, type: 'Piso', label: floor.label, targetFloor: floor });
      }

      floor.apartments.forEach(apt => {
        if (apt.unitNumber.toLowerCase().includes(lowerQuery)) {
          results.push({ id: apt.id, type: 'Departamento', label: `Depto ${apt.unitNumber}`, sublabel: floor.label, targetApartment: apt });
        }

        apt.residents.forEach(res => {
          if (`${res.firstName} ${res.lastName}`.toLowerCase().includes(lowerQuery)) {
            results.push({ id: res.id, type: 'Persona', label: `${res.firstName} ${res.lastName}`, sublabel: `Depto ${apt.unitNumber}`, targetApartment: apt });
          }
          res.vehicles.forEach((v, idx) => {
            if (v.model.toLowerCase().includes(lowerQuery) || v.plate.toLowerCase().includes(lowerQuery)) {
              results.push({ id: `${res.id}-v-${idx}`, type: 'Vehículo', label: v.model, sublabel: v.plate, targetApartment: apt });
            }
          });
        });
      });
    });

    setSuggestions(results.slice(0, 8));
    setIsOpen(results.length > 0);
  }, [query, data]);

  const handleSelect = (result: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    if (result.targetApartment) onSelectApartment(result.targetApartment);
    else if (result.targetFloor) onSelectFloor(result.targetFloor);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400 dark:text-slate-600 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all dark:text-white"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          {suggestions.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{result.label}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">{result.sublabel}</div>
              </div>
              <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-bold uppercase group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 group-hover:text-white transition-colors">
                {result.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
