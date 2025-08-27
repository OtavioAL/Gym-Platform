import { hash } from 'bcryptjs';
import AppDataSource from './data-source';
import { User } from '../modules/users/entities/User';
import { BmiClassification } from '../modules/evaluations/entities/BmiClassification';
import { UserRole, UserStatus } from '../modules/users/enums';

const classifications = [
  {
    label: 'underweight',
    description: 'Abaixo do peso normal',
  },
  {
    label: 'normal_weight',
    description: 'Peso normal',
  },
  {
    label: 'overweight',
    description: 'Sobrepeso',
  },
  {
    label: 'obesity_class_1',
    description: 'Obesidade Grau I',
  },
  {
    label: 'obesity_class_2',
    description: 'Obesidade Grau II',
  },
  {
    label: 'obesity_class_3',
    description: 'Obesidade Grau III',
  },
];

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const bmiRepo = AppDataSource.getRepository(BmiClassification);

  const adminExists = await userRepo.findOne({ where: { username: 'admin@example.com' } });

  if (!adminExists) {
    const admin = userRepo.create({
      name: 'Admin',
      username: 'admin@example.com',
      password: await hash('admin123', 10),
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    });

    await userRepo.save(admin);
  }

  for (const classification of classifications) {
    const exists = await bmiRepo.findOne({ where: { label: classification.label as any } });

    if (!exists) {
      await bmiRepo.save(
        bmiRepo.create({
          label: classification.label as any,
          description: classification.description,
        }),
      );
    }
  }

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Erro ao rodar seed:', err);
});
