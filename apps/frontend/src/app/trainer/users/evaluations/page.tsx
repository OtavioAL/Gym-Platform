import dynamic from 'next/dynamic';

const TrainerEvaluationsPage = dynamic(() => import('@/features/evaluations/ListEvaluationsPage'));

export default function TrainerEvaluations() {
  return <TrainerEvaluationsPage />;
}
