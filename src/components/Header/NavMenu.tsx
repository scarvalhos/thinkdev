import { Stack } from '@mui/material';
import { ActiveLink } from './ActiveLink';

export function NavMenu() {
  return (
    <Stack
      direction="row"
      spacing={5}
    >
        <ActiveLink href="/home" styles={style.links}>
          <p>Home</p>
        </ActiveLink>
        <ActiveLink href="/me" styles={style.links}>
          <p>Profile</p>
        </ActiveLink>

    </Stack>
  );
}

const style = {
  links: {
      textDecoration: 'none',
      padding: '15px 10px',
      color: '#AAAAAA',
  },
};
