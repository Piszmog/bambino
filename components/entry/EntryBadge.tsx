import { Button, Group, Text } from '@mantine/core';
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
    case 'julia: time off':
      color = 'violet';
      break;
    case 'bram':
      color = 'blue';
      break;
    case 'bram: time off':
      color = 'cyan';
      break;
    case 'time off':
      color = 'red';
      break;
    default:
      color = 'orange';
      break;
  }

  return (
    <Button fullWidth color={color} radius="xl" compact size="xs" onClick={onClick}>
      <Group position="apart">
        <Text>{entry.baby}</Text>
        {!entry.baby.includes('time off') ? (
          <Text>
            {entry.start.getHours()}
            {entry.start.getMinutes() != 0 ? `:${entry.start.getMinutes()}` : ''} -{' '}
            {entry.end.getHours()}
            {entry.end.getMinutes() != 0 ? `:${entry.end.getMinutes()}` : ''}
          </Text>
        ) : null}
      </Group>
    </Button>
  );
};

export default EntryBadge;
