'use client';

import dynamic from 'next/dynamic';

const CreateEvaluationsPage = dynamic(() => import('@/features/evaluations/CreateEvaluationPage'));

export default function NewEvaluationPage() {
  return <CreateEvaluationsPage />;
}
