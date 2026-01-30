
import { Building, Floor, Apartment, Resident } from './types';

const generateResident = (id: string, fName: string, lName: string, index: number): Resident => {
  return {
    id,
    firstName: fName,
    lastName: lName,
    dni: `${Math.floor(Math.random() * 30000000) + 10000000}X`,
    imageUrl: `https://i.pravatar.cc/300?u=${id}`,
    vehicles: [
      { 
        model: 'Toyota Corolla', 
        plate: 'AB123CD',
        imageUrl: `https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400&auto=format&fit=crop`
      },
      { 
        model: 'Honda Civic', 
        plate: 'XY987ZT',
        imageUrl: `https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=400&auto=format&fit=crop`
      }
    ].slice(0, Math.floor(Math.random() * 2) + 1),
    domesticStaff: [
      { 
        firstName: 'Maria', 
        lastName: 'Gomez', 
        dni: '45678912A',
        imageUrl: `https://i.pravatar.cc/300?u=staff-${id}`
      }
    ],
    permanentVisitors: [
      { 
        firstName: 'Julian', 
        lastName: 'Sosa', 
        dni: '12312312Z',
        imageUrl: `https://i.pravatar.cc/300?u=visitor1-${id}`
      },
      { 
        firstName: 'Marta', 
        lastName: 'Luz', 
        dni: '98765432Y',
        imageUrl: `https://i.pravatar.cc/300?u=visitor2-${id}`
      }
    ].slice(0, Math.floor(Math.random() * 2) + 1)
  };
};

const firstNames = ['Juan', 'Pedro', 'Sofia', 'Lucia', 'Carlos', 'Ana', 'Diego', 'Elena', 'Ricardo', 'Valentina'];
const lastNames = ['Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Sanchez', 'Perez', 'Gomez', 'Diaz', 'Torres', 'Ramirez'];

const generateApartment = (floor: number, unit: number): Apartment => {
  const unitLabel = `${floor}${unit}`;
  const numResidents = Math.floor(Math.random() * 2) + 1;
  const residents = Array.from({ length: numResidents }).map((_, i) => 
    generateResident(
      `res-${floor}-${unit}-${i}`,
      firstNames[Math.floor(Math.random() * firstNames.length)],
      lastNames[Math.floor(Math.random() * lastNames.length)],
      i
    )
  );
  return {
    id: `apt-${floor}-${unit}`,
    unitNumber: unitLabel,
    residents
  };
};

const generateFloors = (): Floor[] => {
  const floorLabels = ['Planta Baja', 'Piso 1', 'Piso 2', 'Piso 3'];
  return floorLabels.map((label, level) => ({
    level,
    label,
    apartments: Array.from({ length: 6 }).map((_, i) => generateApartment(level, i + 1))
  }));
};

export const HOUSING_24_DATA: Building = {
  name: 'Housing 24',
  floors: generateFloors(),
  heroImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop'
};
