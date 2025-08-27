import { SimpleGrid } from '@chakra-ui/react';
import DashboardCard from '../components/DashboardCard';

const TrainerDashboardPage = () => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      <DashboardCard title="Turmas" desc="Gerencie alunos e turmas." link="/admin/users" />
      <DashboardCard title="Avaliações" desc="Crie e revise avaliações." link="/admin/users" />
      <DashboardCard
        title="Relatórios"
        desc="Acompanhe o desempenho dos alunos."
        link="/admin/users"
      />
    </SimpleGrid>
  );
};

export default TrainerDashboardPage;
