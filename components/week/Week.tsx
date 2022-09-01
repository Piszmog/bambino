import { Center, Grid, Group, Text, Title } from '@mantine/core';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Report from '../report/Report';
import { Entry } from '../../lib/models';
import { getWeekDays, toWeekId } from '../../lib/week';
import EditEntryModal from '../entry/EditEntryModal';
import AddEntryModal from '../entry/AddEntryModal';
import { addEntry, deleteEntry, updateEntry, useWeek } from '../../lib/firebase';
import Day from './Day';
import { getMonthsNames } from '@mantine/dates';
import ChangeWeekButton from './ChangeWeekButton';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const monthName = getMonthsNames('en', 'MMMM');

const Week = () => {
  const [offset, setOffset] = useState(0);
  const date = useMemo(() => dayjs(new Date()).add(offset, 'day').toDate(), [offset]);
  const weekdays = getWeekDays(date);

  const [weekData, loading] = useWeek(toWeekId(weekdays[0]));

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry>();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const onAddClick = (date: Date) => {
    setSelectedDate(date);
    setOpenAdd(true);
  };

  const onAdd = (entry: Entry) => {
    addEntry(weekData!.id, entry).then(() => {
      setSelectedDate(undefined);
      setOpenAdd(false);
    });
  };

  const onAddClose = () => {
    setSelectedDate(undefined);
    setOpenAdd(false);
  };

  const onEditClick = (entry: Entry) => {
    setSelectedEntry(entry);
    setOpenEdit(true);
  };

  const onEdit = (entry: Entry) => {
    updateEntry(weekData!.id, selectedEntry!, entry).then(() => {
      setSelectedEntry(undefined);
      setOpenEdit(false);
    });
  };

  const onEditClose = () => {
    setSelectedEntry(undefined);
    setOpenEdit(false);
  };

  const onDelete = () => {
    deleteEntry(weekData!.id, selectedEntry!).then(() => {
      setSelectedEntry(undefined);
      setOpenEdit(false);
    });
  };

  return (
    <div>
      <Center mb="md">
        <Group direction="column" position="center" spacing="xs">
          <Group>
            <ChangeWeekButton
              position="right"
              onClick={() => setOffset(offset - 7)}
              icon={<FaAngleDoubleLeft />}
            />
            <Title>{monthName[date.getMonth()]}</Title>
            <ChangeWeekButton
              position="left"
              onClick={() => setOffset(offset + 7)}
              icon={<FaAngleDoubleRight />}
            />
          </Group>
          <Text color="dimmed">
            {monthName[weekdays[0].getMonth()]} {weekdays[0].getDate()} -{' '}
            {monthName[weekdays[6].getMonth()]} {weekdays[6].getDate()}
          </Text>
        </Group>
      </Center>
      <Grid columns={14} justify="center" m="md">
        {weekdays.map((date, index) => (
          <Grid.Col key={index} sm={2} grow>
            <Day
              key={index}
              date={date}
              data={weekData}
              loading={loading}
              onAddClick={() => onAddClick(date)}
              onEditClick={onEditClick}
            />
          </Grid.Col>
        ))}
      </Grid>
      <Report data={weekData} loading={loading} />
      {selectedEntry && (
        <EditEntryModal
          opened={openEdit}
          onClose={onEditClose}
          onSave={onEdit}
          onDelete={onDelete}
          entry={selectedEntry}
        />
      )}
      {selectedDate && (
        <AddEntryModal opened={openAdd} date={selectedDate} onClose={onAddClose} onSave={onAdd} />
      )}
    </div>
  );
};

export default Week;
