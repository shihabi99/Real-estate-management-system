import React, { useState } from 'react';
import { DashboardHeader } from './components/layout/DashboardHeader';
import { useProperties } from './features/properties/hooks/useProperties';
import { usePeople } from './features/people/hooks/usePeople';

// Property Components
import { PropertyGrid } from './features/properties/components/PropertyGrid';
import { PropertyDetail } from './features/properties/components/PropertyDetail';
import { BuildingModal } from './features/properties/components/BuildingModal';
import { ApartmentModal } from './features/properties/components/ApartmentModal';

// People Components
import { PeopleTable } from './features/people/components/PeopleTable';
import { UserModal } from './features/people/components/UserModal';

interface DashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, isDarkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'people'>('properties');

  // Hooks
  const properties = useProperties();
  const people = usePeople();

  // Derived State
  const owners = people.users.filter(u => u.role === 'owner');

  const handleLogoClick = () => {
    properties.setSelectedBuildingId(null);
    setActiveTab('properties');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-200">
      
      <DashboardHeader 
        onLogout={onLogout}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          properties.setSelectedBuildingId(null);
        }}
        onLogoClick={handleLogoClick}
      />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-200">
        
        {/* --- PROPERTIES TAB --- */}
        {activeTab === 'properties' && (
          <>
            {properties.selectedBuilding ? (
              <PropertyDetail 
                building={properties.selectedBuilding}
                users={people.users}
                onBack={() => properties.setSelectedBuildingId(null)}
                onAddApartment={() => properties.setIsApartmentModalOpen(true)}
              />
            ) : (
              <PropertyGrid 
                buildings={properties.buildings}
                onSelectBuilding={properties.setSelectedBuildingId}
                onAddBuilding={properties.openAddBuildingModal}
                onEditBuilding={properties.openEditBuildingModal}
              />
            )}
          </>
        )}

        {/* --- PEOPLE TAB --- */}
        {activeTab === 'people' && (
          <PeopleTable 
            users={people.users}
            onAddUser={people.openAddUserModal}
            onEditUser={people.handleEditUser}
          />
        )}
      </main>

      {/* --- MODALS --- */}
      
      <BuildingModal 
        isOpen={properties.isBuildingModalOpen}
        onClose={properties.closeBuildingModal}
        onSave={properties.handleSaveBuilding}
        editingBuildingId={properties.editingBuildingId}
        buildings={properties.buildings}
        isLoading={properties.isLoading}
      />

      <ApartmentModal 
        isOpen={properties.isApartmentModalOpen}
        onClose={() => properties.setIsApartmentModalOpen(false)}
        onSave={properties.handleAddApartment}
        buildingName={properties.selectedBuilding?.name}
        owners={owners}
        isLoading={properties.isLoading}
      />

      <UserModal 
        isOpen={people.isUserModalOpen}
        onClose={people.closeUserModal}
        onSave={people.handleSaveUser}
        editingUserId={people.editingUserId}
        users={people.users}
        isLoading={people.isLoading}
      />

    </div>
  );
};
