import { Button, Group, Modal, Select } from '@mantine/core';
import { useState } from 'react';
import { TimeRangeInput } from '@mantine/dates';
import { Entry } from '../../lib/models';

type EditHoursModalProps = {
  opened: boolean;
  onClose: () => void;
  onSave: (entry: Entry) => void;
  onDelete: () => void;
  entry: Entry;
};

const EditEntryModal = ({ opened, onClose, onSave, onDelete, entry }: EditHoursModalProps) => {
  const [dates, setDates] = useState<[Date, Date]>([entry.start, entry.end]);
  const [selectedBaby, setSelectedBaby] = useState(entry.baby);
  const [timeRangeError, setTimeRangeError] = useState('');
  const baseDate = entry.start;

  const handleChange = (values: [Date, Date]) => {
    const start = updateDate(values[0], baseDate);
    const end = updateDate(values[1], baseDate);
    if (start > end) {
      setTimeRangeError('Start time must be before end time');
    } else {
      setTimeRangeError('');
      setDates(values);
    }
  };

  const handleOnSave = () => {
    if (!timeRangeError) {
      onSave({
        id: entry?.id,
        start: dates[0],
        end: dates[1],
        baby: selectedBaby!,
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Edit Entry'
    >
      <Select
        label='Baby'
        mb='sm'
        data={['both', 'bram', 'julia', 'time off', 'julia: time off', 'bram: time off']}
        value={selectedBaby}
        onChange={value => setSelectedBaby(value!)}
      />
      <TimeRangeInput
        label='Hours'
        value={dates}
        onChange={handleChange}
        error={timeRangeError}
      />
      <Group position='right' mt='xl'>
        <Button color='gray' onClick={onClose}>Cancel</Button>
        <Button color='red' onClick={onDelete}>Delete</Button>
        <Button
          onClick={handleOnSave}
          disabled={timeRangeError !== ''}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
};

const updateDate = (input: Date, actual: Date): Date => {
  input.setFullYear(actual.getFullYear());
  input.setMonth(actual.getMonth());
  input.setDate(actual.getDate());
  return input;
};

export default EditEntryModal;
