import React from 'react';
import { useAuth } from '../context/AuthContext';

const RoleBadge: React.FC = () => {
  const { isCustomer, isWaiter, isKitchen, isAdmin, user } = useAuth();

  const role = isAdmin() ? 'Admin'
    : isKitchen() ? 'Kitchen'
    : isWaiter() ? 'Waiter'
    : isCustomer() ? 'Customer'
    : null;

  if (!role) return null;

  return (
    <span className="px-3 py-1 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest">
      {role}
    </span>
  );
};

export default RoleBadge;