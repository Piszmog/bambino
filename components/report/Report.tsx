import { Center, Container, Paper, Skeleton, Table, Text, Title } from '@mantine/core';
import { Week } from '../../lib/models';
import { getReportData } from '../../lib/report';

type ReportProps = {
  data?: Week;
  loading: boolean;
};

const Report = ({ data, loading }: ReportProps) => {
  let rows;
  if (data) {
    const reportData = getReportData(data.entries);
    rows = [
      <tr key='julia'>
        <td>Julia</td>
        <td>{reportData.julia.hours}</td>
        <td>${reportData.julia.cost}</td>
      </tr>,
      <tr key='bram'>
        <td>Bram</td>
        <td>{reportData.bram.hours}</td>
        <td>${reportData.bram.cost}</td>
      </tr>,
      <tr key='total'>
        <td>Total</td>
        <td>{reportData.totalHours}</td>
        <td>${reportData.totalCost}</td>
      </tr>,
    ];
  }
  if (loading) {
    rows = [
      <tr key='julia'>
        <td>Julia</td>
        <td><Skeleton height={8} radius='xl' /></td>
        <td><Skeleton height={8} radius='xl' /></td>
      </tr>,
      <tr key='bram'>
        <td>Bram</td>
        <td><Skeleton height={8} radius='xl' /></td>
        <td><Skeleton height={8} radius='xl' /></td>
      </tr>,
      <tr key='total'>
        <td>Total</td>
        <td><Skeleton height={8} radius='xl' /></td>
        <td><Skeleton height={8} radius='xl' /></td>
      </tr>,
    ];
  }

  return (
    <Container mt='xl'>
      <Paper shadow='xl' p='md'>
        <Center>
          <Title order={2} mb='xl'>Report</Title>
        </Center>
        <Table>
          <thead>
          <tr>
            <th>Baby</th>
            <th>Total Hours</th>
            <th>Cost</th>
          </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Report;
