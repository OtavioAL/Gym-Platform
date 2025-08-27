import dynamic from 'next/dynamic';

const AdminUsers = dynamic(() => import('@/features/users/ListUsersPage'));

export default function AdminUsersPage() {
  return <AdminUsers />;
}
