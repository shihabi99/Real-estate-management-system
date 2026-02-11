import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Building, Apartment, SystemUser, UserRole } from '../types';

interface DashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

type Tab = 'properties' | 'people';

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, isDarkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState<Tab>('properties');
  
  // Data State
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [users, setUsers] = useState<SystemUser[]>([]);
  
  // Selection State
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  
  // Modal States
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isApartmentModalOpen, setIsApartmentModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  // Form States
  const [newBuilding, setNewBuilding] = useState({ name: '', location: '' });
  const [newApartment, setNewApartment] = useState({ unitNumber: '', floor: '', ownerId: '' });
  const [newUser, setNewUser] = useState({ name: '', role: 'tenant' as UserRole, email: '', phone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId);
  const owners = users.filter(u => u.role === 'owner');

  // --- Handlers ---

  const handleAddBuilding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuilding.name || !newBuilding.location) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const building: Building = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBuilding.name,
      location: newBuilding.location,
      apartments: []
    };

    setBuildings([...buildings, building]);
    setNewBuilding({ name: '', location: '' });
    setIsBuildingModalOpen(false);
    setIsLoading(false);
  };

  const handleAddApartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApartment.unitNumber || !selectedBuildingId) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const apartment: Apartment = {
      id: Math.random().toString(36).substr(2, 9),
      unitNumber: newApartment.unitNumber,
      floor: newApartment.floor || '1',
      status: 'vacant',
      ownerId: newApartment.ownerId || undefined
    };

    setBuildings(buildings.map(b => {
      if (b.id === selectedBuildingId) {
        return { ...b, apartments: [...b.apartments, apartment] };
      }
      return b;
    }));

    setNewApartment({ unitNumber: '', floor: '', ownerId: '' });
    setIsApartmentModalOpen(false);
    setIsLoading(false);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name) return;
    // Password required only for new users
    if (!editingUserId && !newUser.password) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingUserId) {
      // Update existing user
      setUsers(users.map(u => {
        if (u.id === editingUserId) {
          return {
            ...u,
            name: newUser.name,
            role: newUser.role,
            email: newUser.email,
            phone: newUser.phone,
            password: newUser.password ? newUser.password : u.password // Only update password if provided
          };
        }
        return u;
      }));
    } else {
      // Create new user
      const user: SystemUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: newUser.name,
        role: newUser.role,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password
      };
      setUsers([...users, user]);
    }

    closeUserModal();
    setIsLoading(false);
  };

  const handleEditUser = (user: SystemUser) => {
    setNewUser({
      name: user.name,
      role: user.role,
      email: user.email || '',
      phone: user.phone || '',
      password: '' // Don't populate password for security, leave blank to keep current
    });
    setEditingUserId(user.id);
    setIsUserModalOpen(true);
  };

  const openAddUserModal = () => {
    setEditingUserId(null);
    setNewUser({ name: '', role: 'tenant', email: '', phone: '', password: '' });
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setEditingUserId(null);
    setNewUser({ name: '', role: 'tenant', email: '', phone: '', password: '' });
  };

  const getOwnerName = (ownerId?: string) => {
    if (!ownerId) return null;
    const owner = users.find(u => u.id === ownerId);
    return owner ? owner.name : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Navigation Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setSelectedBuildingId(null); setActiveTab('properties'); }}>
              <div className="bg-slate-900 dark:bg-sky-600 text-white p-1.5 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900 dark:text-white tracking-tight hidden sm:inline transition-colors">Admin<span className="text-slate-500 dark:text-slate-400 font-normal">Panel</span></span>
            </div>
            
            <nav className="flex space-x-1">
              <button
                onClick={() => { setActiveTab('properties'); setSelectedBuildingId(null); }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'properties' 
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => { setActiveTab('people'); setSelectedBuildingId(null); }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'people' 
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                People
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-600"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <Button variant="ghost" onClick={onLogout} className="text-sm">
              Log out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-200">
        
        {/* --- PROPERTIES TAB --- */}
        {activeTab === 'properties' && (
          <>
            {selectedBuilding ? (
              // View: Single Building Details
              <div className="animate-fadeIn">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6 transition-colors">
                  <button 
                    onClick={() => setSelectedBuildingId(null)} 
                    className="hover:text-slate-900 dark:hover:text-white flex items-center transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Properties
                  </button>
                  <span className="mx-2">/</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedBuilding.name}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{selectedBuilding.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">{selectedBuilding.location}</p>
                  </div>
                  <Button onClick={() => setIsApartmentModalOpen(true)}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Apartment
                  </Button>
                </div>

                {selectedBuilding.apartments.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center transition-colors">
                    <div className="mx-auto w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 transition-colors">
                        <svg className="w-6 h-6 text-slate-400 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white transition-colors">No apartments yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 mb-4 transition-colors">Add units to this building to start managing them.</p>
                    <Button variant="secondary" onClick={() => setIsApartmentModalOpen(true)} className="text-xs">
                      Create First Unit
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {selectedBuilding.apartments.map((apt) => (
                      <div key={apt.id} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-all group relative cursor-default flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Unit</div>
                          <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                            apt.status === 'vacant' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30' : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/30'
                          }`}>
                            {apt.status}
                          </span>
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
            ) : (
              // View: All Buildings List
              <div className="animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Properties</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage your buildings and real estate assets.</p>
                  </div>
                  <Button onClick={() => setIsBuildingModalOpen(true)}>
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
                    <Button variant="secondary" onClick={() => setIsBuildingModalOpen(true)}>
                      Add Building
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buildings.map((building) => (
                      <div 
                        key={building.id} 
                        onClick={() => setSelectedBuildingId(building.id)}
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
            )}
          </>
        )}

        {/* --- PEOPLE TAB --- */}
        {activeTab === 'people' && (
          <div className="animate-fadeIn">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">People</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">Manage tenants and owners in your system.</p>
              </div>
              <Button onClick={openAddUserModal}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Add Person
              </Button>
            </div>

            {users.length === 0 ? (
               <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center transition-colors">
                <div className="mx-auto w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <svg className="w-8 h-8 text-slate-400 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white transition-colors">No people added</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2 mb-6 transition-colors">
                  Add owners and tenants to the system to assign them to properties.
                </p>
                <Button variant="secondary" onClick={openAddUserModal}>
                  Add Person
                </Button>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold text-xs">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              user.role === 'owner' 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                            {user.email || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                            {user.phone || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleEditUser(user)} 
                              className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                              aria-label="Edit User"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- MODALS --- */}

      {/* Add Building Modal */}
      {isBuildingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={() => setIsBuildingModalOpen(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Add New Property</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Enter the details for the new building.</p>
            
            <form onSubmit={handleAddBuilding} className="space-y-4">
              <Input
                id="buildingName"
                label="Building Name"
                placeholder="e.g. Sunset Heights"
                value={newBuilding.name}
                onChange={(e) => setNewBuilding({ ...newBuilding, name: e.target.value })}
                required
                autoFocus
              />
              <Input
                id="location"
                label="Location / Address"
                placeholder="e.g. 1234 Market St, San Francisco"
                value={newBuilding.location}
                onChange={(e) => setNewBuilding({ ...newBuilding, location: e.target.value })}
                required
              />
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsBuildingModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="flex-1" isLoading={isLoading}>Add Property</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Apartment Modal */}
      {isApartmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={() => setIsApartmentModalOpen(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Add Apartment</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Adding unit to {selectedBuilding?.name}</p>
            
            <form onSubmit={handleAddApartment} className="space-y-4">
              <Input
                id="unitNumber"
                label="Unit Number"
                placeholder="e.g. 101, 3B"
                value={newApartment.unitNumber}
                onChange={(e) => setNewApartment({ ...newApartment, unitNumber: e.target.value })}
                required
                autoFocus
              />
              <Input
                id="floor"
                label="Floor Level"
                placeholder="e.g. 1, 3"
                value={newApartment.floor}
                onChange={(e) => setNewApartment({ ...newApartment, floor: e.target.value })}
              />
              
              <div>
                <label htmlFor="ownerSelect" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
                  Assign Owner (Optional)
                </label>
                <select
                  id="ownerSelect"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-700 focus:border-slate-900 dark:focus:border-slate-500 transition-colors"
                  value={newApartment.ownerId}
                  onChange={(e) => setNewApartment({...newApartment, ownerId: e.target.value})}
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
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsApartmentModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="flex-1" isLoading={isLoading}>Add Unit</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={closeUserModal} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {editingUserId ? 'Edit Person' : 'Add Person'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {editingUserId ? 'Update user details.' : 'Create a new user in the system.'}
            </p>
            
            <form onSubmit={handleSaveUser} className="space-y-4">
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
                <Button type="button" variant="secondary" className="flex-1" onClick={closeUserModal}>Cancel</Button>
                <Button type="submit" className="flex-1" isLoading={isLoading}>
                  {editingUserId ? 'Save Changes' : 'Create User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};