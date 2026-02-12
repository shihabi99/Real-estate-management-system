import { useState } from 'react';
import { SystemUser, UserRole } from '../../../types/index';

export const usePeople = () => {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveUser = async (user: Partial<SystemUser> & { name: string; role: UserRole }) => {
    if (!user.name) return;
    if (!editingUserId && !user.password) return; // New users need password

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingUserId) {
      // Update existing
      setUsers(users.map(u => {
        if (u.id === editingUserId) {
          return {
            ...u,
            name: user.name,
            role: user.role,
            email: user.email,
            phone: user.phone,
            password: user.password ? user.password : u.password
          };
        }
        return u;
      }));
    } else {
      // Create new
      const newUser: SystemUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone,
        password: user.password
      };
      setUsers([...users, newUser]);
    }

    closeUserModal();
    setIsLoading(false);
  };

  const handleEditUser = (user: SystemUser) => {
    setEditingUserId(user.id);
    setIsUserModalOpen(true);
  };

  const openAddUserModal = () => {
    setEditingUserId(null);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setEditingUserId(null);
  };

  return {
    users,
    editingUserId,
    isUserModalOpen,
    isLoading,
    handleSaveUser,
    handleEditUser,
    openAddUserModal,
    closeUserModal,
  };
};
