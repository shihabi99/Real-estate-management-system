import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SystemUser, UserRole } from '../../../types/index';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<SystemUser> & { name: string; role: UserRole }) => Promise<void>;
  editingUserId: string | null;
  users: SystemUser[];
  isLoading: boolean;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingUserId,
  users,
  isLoading,
}) => {
  const [newUser, setNewUser] = useState({ name: '', role: 'tenant' as UserRole, email: '', phone: '', password: '' });

  useEffect(() => {
    if (isOpen && editingUserId) {
      const user = users.find(u => u.id === editingUserId);
      if (user) {
        setNewUser({
          name: user.name,
          role: user.role,
          email: user.email || '',
          phone: user.phone || '',
          password: '' 
        });
      }
    } else if (isOpen) {
      setNewUser({ name: '', role: 'tenant', email: '', phone: '', password: '' });
    }
  }, [isOpen, editingUserId, users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(newUser);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-fadeIn">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {editingUserId ? 'Edit Person' : 'Add Person'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {editingUserId ? 'Update user details.' : 'Create a new user in the system.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="userName"
            label="Full Name"
            placeholder="e.g. John Doe"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
            autoFocus
          />
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNewUser({...newUser, role: 'owner'})}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                  newUser.role === 'owner' 
                    ? 'bg-purple-50 border-purple-200 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-300 dark:ring-purple-800' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => setNewUser({...newUser, role: 'tenant'})}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                  newUser.role === 'tenant' 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 dark:ring-blue-800' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                Tenant
              </button>
            </div>
          </div>

          <Input
            id="email"
            label="Email (Optional)"
            placeholder="john@example.com"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <Input
            id="phone"
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder={editingUserId ? "Leave blank to keep current" : "••••••••"}
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required={!editingUserId} // Only required when creating a new user
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>
              {editingUserId ? 'Save Changes' : 'Create User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
