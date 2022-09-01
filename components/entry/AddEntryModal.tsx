import { Button, Group, Modal, Select } from "@mantine/core";
import { useState } from "react";
import { TimeRangeInput } from "@mantine/dates";
import { Entry } from "../../lib/models";
import { v4 as uuidv4 } from "uuid";

type EditHoursModalProps = {
  date: Date;
  opened: boolean;
  onClose: () => void;
  onSave: (entry: Entry) => void;
};

const AddEntryModal = ({ date, opened, onClose, onSave }: EditHoursModalProps) => {
  const [dates, setDates] = useState<[Date, Date]>(getDefaultValue());
  const [selectedBaby, setSelectedBaby] = useState("both");
  const [timeRangeError, setTimeRangeError] = useState("");

  const handleChange = (values: [Date, Date]) => {
    if (values[0] > values[1]) {
      setTimeRangeError("Start time must be before end time");
    } else {
      setTimeRangeError("");
      setDates(values);
    }
  };

  const handleOnSave = () => {
    if (!timeRangeError) {
      onSave({
        id: uuidv4(),
        start: updateDate(dates![0], date),
        end: updateDate(dates![1], date),
        baby: selectedBaby!
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Entry">
      <Select
        label="Baby"
        mb="sm"
        placeholder="Select a baby"
        data={["both", "bram", "julia", "time off", "julia: time off", "bram: time off"]}
        value={selectedBaby}
        onChange={(value) => setSelectedBaby(value!)}
        required
      />
      <TimeRangeInput
        label="Hours"
        value={dates}
        onChange={handleChange}
        error={timeRangeError}
        clearable
        required
      />
      <Group position="right" mt="xl">
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleOnSave} disabled={timeRangeError !== ""}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};

const getDefaultValue = (): [Date, Date] => {
  const start = new Date();
  const end = new Date();
  start.setHours(8, 0, 0, 0);
  end.setHours(15, 0, 0, 0);
  return [start, end];
};

const updateDate = (input: Date, actual: Date): Date => {
  input.setFullYear(actual.getFullYear());
  input.setDate(actual.getDate());
  input.setMonth(actual.getMonth());
  return input;
};

export default AddEntryModal;
