import { SimpleGrid } from '@chakra-ui/react';
import DashboardCard from '../components/DashboardCard';

const AdminDashboardPage = () => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      <DashboardCard
        title="Gerenciar Usuários"
        desc="Criar, editar e remover usuários."
        link="/admin/users"
      />
      <DashboardCard
        title="Avaliações"
        desc="Crie e revise avaliações."
        link="/admin/users/evaluations"
      />
      <DashboardCard
        title="Relatórios"
        desc="Acompanhe o desempenho dos alunos."
        link="/admin/users/evaluations"
      />
    </SimpleGrid>
  );
};

export default AdminDashboardPage;
