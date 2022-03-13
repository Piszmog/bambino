import { ActionIcon, Center } from '@mantine/core';
import { FaPlus } from 'react-icons/fa';

type AddEntryButtonProps = {
  onClick: () => void;
};

const AddEntryButton = ({ onClick }: AddEntryButtonProps) => {
  return (
    <Center mb='xs'>
      <ActionIcon onClick={onClick}>
        <FaPlus />
      </ActionIcon>
    </Center>
  );
};

export default AddEntryButton;
