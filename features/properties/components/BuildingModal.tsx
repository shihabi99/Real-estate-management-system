import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Building } from '../../../types/index';

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, location: string) => Promise<void>;
  editingBuildingId: string | null;
  buildings: Building[];
  isLoading: boolean;
}

export const BuildingModal: React.FC<BuildingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingBuildingId,
  buildings,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (isOpen && editingBuildingId) {
      const building = buildings.find(b => b.id === editingBuildingId);
      if (building) {
        setName(building.name);
        setLocation(building.location);
      }
    } else if (isOpen) {
      setName('');
      setLocation('');
    }
  }, [isOpen, editingBuildingId, buildings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;
    await onSave(name, location);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all animate-fadeIn">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {editingBuildingId ? 'Edit Property' : 'Add New Property'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {editingBuildingId ? 'Update property details.' : 'Enter the details for the new building.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="buildingName"
            label="Building Name"
            placeholder="e.g. Sunset Heights"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <Input
            id="location"
            label="Location / Address"
            placeholder="e.g. 1234 Market St, San Francisco"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>
              {editingBuildingId ? 'Save Changes' : 'Add Property'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
