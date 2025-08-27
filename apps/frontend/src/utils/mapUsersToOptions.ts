import { UserDTO } from '@shared/types';

type SelectOption = {
  label: string;
  value: string;
};

export function mapUsersToOptions(users: UserDTO[]): SelectOption[] {
  return users?.length
    ? users?.map((user) => ({
        label: user.name,
        value: user.id,
      }))
    : [];
}
