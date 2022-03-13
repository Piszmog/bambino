import { Center, Container, Title } from '@mantine/core';

const NotAuthorized = () => {
  return (
    <Container>
      <Center>
        <Title>You are not authorized to view page. Please contact administrator to login.</Title>
      </Center>
    </Container>
  );
};

export default NotAuthorized;
