import { Center, Paper, SimpleGrid, Title } from '@mantine/core';
import { getMonthsNames } from '@mantine/dates';

const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthName = getMonthsNames('en', 'MMMM');

type WeekHeaderProps = {
  date: Date;
};

const WeekHeader = ({ date }: WeekHeaderProps) => {
  return (
    <>
      <Center>
        <Title>{monthName[date.getMonth()]}</Title>
      </Center>
      <SimpleGrid cols={9} mb='xs'>
        <div />
        {
          weekdayNames.map((name, index) => (
            <Paper key={index} shadow='xl'>
              <Center>
                <Title order={3}>{name}</Title>
              </Center>
            </Paper>
          ))
        }
        <div />
      </SimpleGrid>
    </>
  );
};

export default WeekHeader;
