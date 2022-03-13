import { signInWithPopup } from '@firebase/auth';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { Button } from '@mantine/core';

const LoginButton = () => {
  const handleLogin = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <Button onClick={handleLogin}>
      Login
    </Button>
  );
};

export default LoginButton;
