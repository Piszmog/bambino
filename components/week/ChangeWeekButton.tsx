import { ActionIcon, Center } from '@mantine/core';
import { ReactElement } from 'react';

type ChangeWeekButtonProps = {
  onClick: () => void;
  icon: ReactElement;
};

const ChangeWeekButton = ({ onClick, icon }: ChangeWeekButtonProps) => {
  return (
    <Center>
      <ActionIcon onClick={onClick}>
        {icon}
      </ActionIcon>
    </Center>
  );
};

export default ChangeWeekButton;
