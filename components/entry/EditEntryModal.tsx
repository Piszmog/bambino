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

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Edit Entry'
    >
      <Select
        label='Baby'
        mb='sm'
        data={['both', 'bram', 'julia', 'time off']}
        value={selectedBaby}
        onChange={value => setSelectedBaby(value!)}
      />
      <TimeRangeInput
        label='Hours'
        value={dates}
        onChange={setDates}
      />
      <Group position='right' mt='xl'>
        <Button color='gray' onClick={onClose}>Cancel</Button>
        <Button color='red' onClick={onDelete}>Delete</Button>
        <Button
          onClick={() => onSave ? onSave({
            id: entry?.id,
            start: dates[0],
            end: dates[1],
            baby: selectedBaby!,
          }) : {}}>Save</Button>
      </Group>
    </Modal>
  );
};

export default EditEntryModal;
