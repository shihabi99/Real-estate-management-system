import React from 'react';
import { Button } from '../../../components/ui/Button';
import { Building } from '../../../types/index';

interface PropertyGridProps {
  buildings: Building[];
  onSelectBuilding: (id: string) => void;
  onAddBuilding: () => void;
  onEditBuilding: (e: React.MouseEvent, id: string) => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ 
  buildings, 
  onSelectBuilding, 
  onAddBuilding,
  onEditBuilding
}) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Properties</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage your buildings and real estate assets.</p>
        </div>
        <Button onClick={onAddBuilding}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Building
        </Button>
      </div>

      {buildings.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center transition-colors">
          <div className="mx-auto w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 transition-colors">
            <svg className="w-8 h-8 text-slate-400 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white transition-colors">No properties yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2 mb-6 transition-colors">
            Get started by adding your first building to the dashboard.
          </p>
          <Button variant="secondary" onClick={onAddBuilding}>
            Add Building
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <div 
              key={building.id} 
              onClick={() => onSelectBuilding(building.id)}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer overflow-hidden group"
            >
              <div className="h-32 bg-slate-100 dark:bg-slate-700 relative transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-300 dark:text-slate-500 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm transition-colors">
                  {building.apartments.length} Units
                </div>

                <button 
                  onClick={(e) => onEditBuilding(e, building.id)}
                  className="absolute top-3 left-3 p-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white shadow-sm transition-colors hover:scale-105"
                  aria-label="Edit Property"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{building.name}</h3>
                <div className="flex items-start text-slate-500 dark:text-slate-400 text-sm transition-colors">
                  <svg className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {building.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
