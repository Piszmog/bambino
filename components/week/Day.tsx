import { Center, Group, Paper, Skeleton, Title } from '@mantine/core';
import EntryBadge from '../entry/EntryBadge';
import AddEntryButton from './AddEntryButton';
import { Entry, Week } from '../../lib/models';
import { isSameDate } from '@mantine/dates';

type DayProps = {
  date: Date;
  data?: Week;
  loading: boolean;
  onAddClick: () => void;
  onEditClick: (entry: Entry) => void;
};

const Day = ({ date, data, loading, onAddClick, onEditClick }: DayProps) => {
  return (
    <Paper shadow='xl'>
      <Center mb='sm'>
        <Title order={3}>{date.getDate()}</Title>
      </Center>
      <Group p='xs'>
        {
          data && data.entries.filter(entry => isSameDate(entry.start, date)).map((entry) => (
            <EntryBadge
              key={entry.id}
              entry={entry}
              onClick={() => onEditClick(entry)}
            />
          ))
        }
        {
          loading && <Skeleton height={8} radius='xl' />
        }
      </Group>
      <AddEntryButton onClick={onAddClick} />
    </Paper>
  );
};

export default Day;
