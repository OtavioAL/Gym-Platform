import dynamic from 'next/dynamic';

const TrainerUsers = dynamic(() => import('@/features/users/ListUsersPage'));

export default function TrainerUsersPage() {
  return <TrainerUsers />;
}
