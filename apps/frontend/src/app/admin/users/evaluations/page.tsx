import dynamic from 'next/dynamic';

const AdminEvaluationsPage = dynamic(() => import('@/features/evaluations/ListEvaluationsPage'));

export default function AdminEvaluations() {
  return <AdminEvaluationsPage />;
}
