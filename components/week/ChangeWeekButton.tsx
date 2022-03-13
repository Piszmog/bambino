import { ActionIcon, Center, Container, Group } from '@mantine/core';
import { ReactElement } from 'react';

type ChangeWeekButtonProps = {
  onClick: () => void;
  position: 'left' | 'right';
  icon: ReactElement;
};

const ChangeWeekButton = ({ onClick, position, icon }: ChangeWeekButtonProps) => {
  return (
    <Group position={position}>
      <ActionIcon onClick={onClick}>
        {icon}
      </ActionIcon>
    </Group>
  );
};

export default ChangeWeekButton;
