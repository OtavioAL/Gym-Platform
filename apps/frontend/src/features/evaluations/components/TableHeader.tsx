import { Th, Thead, Tr } from '@chakra-ui/react';

interface IPropsTableHeader {
  columns: {
    name: string;
    label: string;
  }[];
}

export const TableHeader = ({ columns }: IPropsTableHeader) => {
  return (
    <Thead>
      <Tr>
        {columns?.map((column) => (
          <Th key={column.name}>{column.label}</Th>
        ))}
      </Tr>
    </Thead>
  );
};
