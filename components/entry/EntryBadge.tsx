import { Button, Text } from '@mantine/core';
import { Entry } from '../../lib/models';

type HoursBadgeProps = {
  entry: Entry;
  onClick?: () => void;
};

const EntryBadge = ({ entry, onClick }: HoursBadgeProps) => {
  let color;
  switch (entry.baby) {
    case 'julia':
      color = 'grape';
      break;
    case 'bram':
      color = 'blue';
      break;
    default:
      color = 'orange';
      break;
  }
  return (
    <Button fullWidth color={color} radius='xl' compact size='xs' onClick={onClick}>
      <Text>{entry.start.getHours()}{entry.start.getMinutes() != 0 ? `:${entry.start.getMinutes()}` : ''} - {entry.end.getHours()}{entry.end.getMinutes() != 0 ? `:${entry.end.getMinutes()}` : ''}</Text>
    </Button>
  );
};

export default EntryBadge;
