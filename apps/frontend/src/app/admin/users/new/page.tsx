'use client';
import dynamic from 'next/dynamic';

const AdminUsersNew = dynamic(() => import('@/features/users/admin/CreateUsersPage'));

export default function AdminUsersNewPage() {
  return <AdminUsersNew />;
}
