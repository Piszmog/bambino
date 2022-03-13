import { Button, Group, Modal, Select } from '@mantine/core';
import { useState } from 'react';
import { TimeRangeInput } from '@mantine/dates';
import { Entry } from '../../lib/models';
import { v4 as uuidv4 } from 'uuid';

type EditHoursModalProps = {
  date: Date;
  opened: boolean;
  onClose: () => void;
  onSave: (entry: Entry) => void;
};

const AddEntryModal = ({ date, opened, onClose, onSave }: EditHoursModalProps) => {
  const [dates, setDates] = useState<[Date, Date]>(getDefaultValue());
  const [selectedBaby, setSelectedBaby] = useState('both');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Add Entry'
    >
      <Select
        label='Baby'
        mb='sm'
        placeholder='Select a baby'
        data={['both', 'bram', 'julia']}
        value={selectedBaby}
        onChange={value => setSelectedBaby(value!)}
        required
      />
      <TimeRangeInput
        label='Hours'
        value={dates}
        onChange={setDates}
        format='12'
        clearable
      />
      <Group position='right' mt='xl'>
        <Button color='gray' onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onSave({
            id: uuidv4(),
            start: updateDate(dates![0], date),
            end: updateDate(dates![1], date),
            baby: selectedBaby!,
          })}>Save</Button>
      </Group>
    </Modal>
  );
};

const getDefaultValue = (): [Date, Date] => {
  const start = new Date();
  const end = new Date();
  start.setHours(8, 0, 0, 0);
  end.setHours(14, 0, 0, 0);
  return [start, end];
};

const updateDate = (input: Date, actual: Date): Date => {
  input.setFullYear(actual.getFullYear());
  input.setMonth(actual.getMonth());
  input.setDate(actual.getDate());
  return input;
};

export default AddEntryModal;
