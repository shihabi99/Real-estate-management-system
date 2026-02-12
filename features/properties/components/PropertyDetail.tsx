import React from 'react';
import { Button } from '../../../components/ui/Button';
import { Building, SystemUser } from '../../../types/index';

interface PropertyDetailProps {
  building: Building;
  users: SystemUser[];
  onBack: () => void;
  onAddApartment: () => void;
  onEditApartment: (id: string) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  building, 
  users,
  onBack, 
  onAddApartment,
  onEditApartment
}) => {
  const getOwnerName = (ownerId?: string) => {
    if (!ownerId) return null;
    const owner = users.find(u => u.id === ownerId);
    return owner ? owner.name : 'Unknown';
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6 transition-colors">
        <button 
          onClick={onBack} 
          className="hover:text-slate-900 dark:hover:text-white flex items-center transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Properties
        </button>
        <span className="mx-2">/</span>
        <span className="font-medium text-slate-900 dark:text-white">{building.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{building.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">{building.location}</p>
        </div>
        <Button onClick={onAddApartment}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Apartment
        </Button>
      </div>

      {building.apartments.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center transition-colors">
          <div className="mx-auto w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 transition-colors">
              <svg className="w-6 h-6 text-slate-400 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
          </div>
          <h3 className="text-sm font-medium text-slate-900 dark:text-white transition-colors">No apartments yet</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 mb-4 transition-colors">Add units to this building to start managing them.</p>
          <Button variant="secondary" onClick={onAddApartment} className="text-xs">
            Create First Unit
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {building.apartments.map((apt) => (
            <div key={apt.id} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-all group relative cursor-default flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Unit</div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                    apt.status === 'vacant' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30' : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/30'
                  }`}>
                    {apt.status}
                  </span>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEditApartment(apt.id); }}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    aria-label="Edit Unit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{apt.unitNumber}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Floor {apt.floor}</div>
              </div>
              {apt.ownerId && (
                 <div className="pt-2 mt-auto border-t border-slate-100 dark:border-slate-700 flex items-center text-xs text-slate-600 dark:text-slate-400 transition-colors">
                   <svg className="w-3 h-3 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                   <span className="truncate">{getOwnerName(apt.ownerId)}</span>
                 </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
