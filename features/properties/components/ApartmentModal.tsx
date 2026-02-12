import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SystemUser } from '../../../types/index';

interface ApartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (unitNumber: string, floor: string, ownerId: string) => Promise<void>;
  buildingName?: string;
  owners: SystemUser[];
  isLoading: boolean;
}

export const ApartmentModal: React.FC<ApartmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  buildingName,
  owners,
  isLoading,
}) => {
  const [unitNumber, setUnitNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [ownerId, setOwnerId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUnitNumber('');
      setFloor('');
      setOwnerId('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitNumber) return;
    await onSave(unitNumber, floor, ownerId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-fadeIn">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Add Apartment</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Adding unit to {buildingName}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="unitNumber"
            label="Unit Number"
            placeholder="e.g. 101, 3B"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            required
            autoFocus
          />
          <Input
            id="floor"
            label="Floor Level"
            placeholder="e.g. 1, 3"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
          
          <div>
            <label htmlFor="ownerSelect" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
              Assign Owner (Optional)
            </label>
            <select
              id="ownerSelect"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-700 focus:border-slate-900 dark:focus:border-slate-500 transition-colors"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
            >
              <option value="">No Owner Assigned</option>
              {owners.map(owner => (
                <option key={owner.id} value={owner.id}>{owner.name}</option>
              ))}
            </select>
            {owners.length === 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-500 mt-1.5">
                No owners found. Add people with 'Owner' role in the People tab.
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>Add Unit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
