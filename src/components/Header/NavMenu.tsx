import { Stack, useTheme } from '@mui/material';

import { ActiveLink } from './ActiveLink';

export function NavMenu() {
  const { palette } = useTheme()

  const style = {
    links: {
        textDecoration: 'none',
        padding: '11px 10px',
        color: palette.primary.contrastText,
    },
  };
  
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
