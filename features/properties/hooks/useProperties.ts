import { useState } from 'react';
import { Building, Apartment } from '../../../types/index';

export const useProperties = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [editingBuildingId, setEditingBuildingId] = useState<string | null>(null);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isApartmentModalOpen, setIsApartmentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId);

  const handleSaveBuilding = async (name: string, location: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (editingBuildingId) {
      setBuildings(buildings.map(b => 
        b.id === editingBuildingId 
          ? { ...b, name, location } 
          : b
      ));
    } else {
      const building: Building = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        location,
        apartments: []
      };
      setBuildings([...buildings, building]);
    }

    closeBuildingModal();
    setIsLoading(false);
  };

  const handleAddApartment = async (unitNumber: string, floor: string, ownerId: string) => {
    if (!selectedBuildingId) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const apartment: Apartment = {
      id: Math.random().toString(36).substr(2, 9),
      unitNumber,
      floor: floor || '1',
      status: 'vacant',
      ownerId: ownerId || undefined
    };

    setBuildings(buildings.map(b => {
      if (b.id === selectedBuildingId) {
        return { ...b, apartments: [...b.apartments, apartment] };
      }
      return b;
    }));

    setIsApartmentModalOpen(false);
    setIsLoading(false);
  };

  const openAddBuildingModal = () => {
    setEditingBuildingId(null);
    setIsBuildingModalOpen(true);
  };

  const openEditBuildingModal = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEditingBuildingId(id);
    setIsBuildingModalOpen(true);
  };

  const closeBuildingModal = () => {
    setIsBuildingModalOpen(false);
    setEditingBuildingId(null);
  };

  return {
    buildings,
    selectedBuilding,
    selectedBuildingId,
    editingBuildingId,
    isBuildingModalOpen,
    isApartmentModalOpen,
    isLoading,
    setSelectedBuildingId,
    setEditingBuildingId,
    setIsApartmentModalOpen,
    handleSaveBuilding,
    handleAddApartment,
    openAddBuildingModal,
    openEditBuildingModal,
    closeBuildingModal,
  };
};
