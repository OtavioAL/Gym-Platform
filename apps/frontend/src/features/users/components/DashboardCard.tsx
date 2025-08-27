import { Button, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface DashboardCardProps {
  title: string;
  desc: string;
  link: string;
}

function DashboardCard({ title, desc, link }: DashboardCardProps) {
  const router = useRouter();
  return (
    <Card p={4} backgroundColor={'lightgray'}>
      <CardBody>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text mb={4}>{desc}</Text>
        <Button colorScheme="blue" onClick={() => router.push(link)}>
          Acessar
        </Button>
      </CardBody>
    </Card>
  );
}

export default DashboardCard;
