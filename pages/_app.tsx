import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { useColorScheme } from '@mantine/hooks';
import Main from '../components/layout/Main';
import Header from '../components/layout/Header';
import { UserContext } from '../lib/context';
import { useAuth } from '../lib/firebase';

const App = ({ Component, pageProps }: AppProps) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const userData = useAuth();

  return (
    <>
      <Head>
        <title>Bambino</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
          <UserContext.Provider value={userData}>
            <Main header={<Header title={'Bambino'} />}>
              <Component {...pageProps} />
            </Main>
          </UserContext.Provider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
