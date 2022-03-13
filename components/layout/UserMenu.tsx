import { Menu, UnstyledButton } from '@mantine/core';
import { FaSignOutAlt } from 'react-icons/fa';
import { auth } from '../../lib/firebase';
import Avatar from './Avatar';
import { signOut } from '@firebase/auth';
import { forwardRef, useContext } from 'react';
import { UserContext } from '../../lib/context';

const UserMenu = () => {
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {
        user &&
        <Menu
          control={<AvatarButton src={user.photoURL!} displayName={user.displayName!} />}
        >
          <Menu.Label>{user.displayName ?? 'User'}</Menu.Label>
          <Menu.Item
            icon={<FaSignOutAlt size={14} />}
            onClick={handleLogout}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      }
    </>
  );
};

type AvatarButtonProps = {
  src: string;
  displayName: string;
};

const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(
  ({ src, displayName, ...others }: AvatarButtonProps, ref) => (
    <UnstyledButton ref={ref} {...others}>
      <Avatar src={src} displayName={displayName} />
    </UnstyledButton>
  ));

AvatarButton.displayName = 'AvatarButton';

export default UserMenu;
