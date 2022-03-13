import { Divider, Group, Paper, Skeleton, Title } from '@mantine/core';
import EntryBadge from '../entry/EntryBadge';
import AddEntryButton from './AddEntryButton';
import { Entry, Week } from '../../lib/models';
import { isSameDate } from '@mantine/dates';

const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type DayProps = {
  date: Date;
  data?: Week;
  loading: boolean;
  onAddClick: () => void;
  onEditClick: (entry: Entry) => void;
};

const Day = ({ date, data, loading, onAddClick, onEditClick }: DayProps) => {
  let dayIndex = date.getDay() - 1;
  if (dayIndex < 0) {
    dayIndex = 6;
  }

  return (
    <Paper shadow='xl'>
      <Group direction='column' position='center' spacing='xs'>
        <Title order={2}>{weekdayNames[dayIndex]}</Title>
        <Title order={3}>{date.getDate()}</Title>
      </Group>
      <Divider mb='xs' />
      <Group p='sm'>
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
