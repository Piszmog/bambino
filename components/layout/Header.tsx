import { Group, Header as MHeader, Title } from '@mantine/core';
import ColorModeButton from './ColorModeButton';
import { FaBaby } from 'react-icons/fa';
import Avatar from './Avatar';
import UserMenu from './UserMenu';

type AppHeaderProps = {
  title: string;
};

const Header = ({ title }: AppHeaderProps) => {
  return (
    <MHeader height={60} p="xs">
      <Group
        style={{
          height: '100%',
          marginTop: 0,
          marginBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        position="apart"
      >
        <Title order={3}>
          <FaBaby />
          {title}
        </Title>
        <Group>
          <ColorModeButton />
          <UserMenu />
        </Group>
      </Group>
    </MHeader>
  );
};

export default Header;
