import { Avatar as MAvatar } from '@mantine/core';

type AvatarProps = {
  src: string;
  displayName: string;
};

const Avatar = ({ src, displayName }: AvatarProps) => {
  return <MAvatar src={src} alt={displayName} radius="xl" size="md" />;
};

export default Avatar;
