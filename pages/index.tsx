import type { NextPage } from 'next';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import UserLogin from '../components/user/UserLogin';
import Week from '../components/week/Week';
import { Center, Container, Loader } from '@mantine/core';
import NotAuthorized from '../components/user/NotAuthorized';

const Home: NextPage = () => {
  const { user, displayName, loading } = useContext(UserContext);

  if (!user) {
    return <UserLogin />;
  }

  if (loading) {
    return (
      <Container>
        <Center>
          <Loader />
        </Center>
      </Container>
    );
  }

  if (!displayName) {
    return <NotAuthorized />;
  }

  return <Week />;
};

export default Home;
