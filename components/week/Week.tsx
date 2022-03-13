import { SimpleGrid } from '@mantine/core';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import WeekHeader from './WeekHeader';
import ChangeWeekButton from './ChangeWeekButton';
import Report from '../report/Report';
import { Entry } from '../../lib/models';
import { getWeekDays, toWeekId } from '../../lib/week';
import EditEntryModal from '../entry/EditEntryModal';
import AddEntryModal from '../entry/AddEntryModal';
import { addEntry, deleteEntry, updateEntry, useWeek } from '../../lib/firebase';
import Day from './Day';

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
    addEntry(weekData!.id, entry)
      .then(() => {
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
    updateEntry(weekData!.id, selectedEntry!, entry)
      .then(() => {
        setSelectedEntry(undefined);
        setOpenEdit(false);
      });
  };

  const onEditClose = () => {
    setSelectedEntry(undefined);
    setOpenEdit(false);
  };

  const onDelete = () => {
    deleteEntry(weekData!.id, selectedEntry!)
      .then(() => {
        setSelectedEntry(undefined);
        setOpenEdit(false);
      });
  };

  return (
    <div>
      <WeekHeader date={date} />
      <SimpleGrid cols={9}>
        <ChangeWeekButton onClick={() => setOffset(offset - 7)} icon={<FaAngleDoubleLeft size='xl' />} />
        {
          weekdays.map((date, index) => (
            <Day
              key={index}
              date={date}
              data={weekData}
              loading={loading}
              onAddClick={() => onAddClick(date)}
              onEditClick={onEditClick}
            />
          ))
        }
        <ChangeWeekButton onClick={() => setOffset(offset + 7)} icon={<FaAngleDoubleRight size='xl' />} />
      </SimpleGrid>
      <Report data={weekData} loading={loading} />
      {
        selectedEntry
        &&
        <EditEntryModal
          opened={openEdit}
          onClose={onEditClose}
          onSave={onEdit}
          onDelete={onDelete}
          entry={selectedEntry}
        />
      }
      {
        selectedDate
        &&
        <AddEntryModal
          opened={openAdd}
          date={selectedDate}
          onClose={onAddClose}
          onSave={onAdd}
        />
      }
    </div>
  );
};

export default Week;
