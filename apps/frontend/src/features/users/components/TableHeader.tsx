import { Th, Thead, Tr } from '@chakra-ui/react';

interface IPropsTableHeader {
  columns: {
    name: string;
    label: string;
    responsive?: boolean;
  }[];
}

export const TableHeader = ({ columns }: IPropsTableHeader) => {
  return (
    <Thead>
      <Tr>
        {columns.map((col) => (
          <Th
            key={col.name}
            display={col.responsive ? { base: 'none', md: 'table-cell' } : 'table-cell'}
          >
            {col.label}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};
