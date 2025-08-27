'use client';
import dynamic from 'next/dynamic';

const TrainerUsersNew = dynamic(() => import('@/features/users/admin/CreateUsersPage'));

export default function TrainerUsersNewPage() {
  return <TrainerUsersNew />;
}
