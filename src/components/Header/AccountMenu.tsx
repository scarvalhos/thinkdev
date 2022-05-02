import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
    Button,
    Tooltip,
    IconButton,
    ListItemIcon,
    MenuItem,
    Menu,
    Avatar,
    Box,
    Divider,
    Stack,
    Typography
} from '@mui/material';
import { Logout, DarkMode, LightMode } from '@mui/icons-material';

import { useAuth } from '../../contexts/AuthContext';
import { useSwitchTheme } from '../../contexts/ThemeContext';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { signOut, user } = useAuth()
    const { switchTheme, theme } = useSwitchTheme()
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        signOut(() => navigate("/"))
    }

    return (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 42, height: 42, background: theme.palette.secondary.dark }} />
            </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.default',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Link to='/me' style={{ textDecoration: 'none', color: '#AAAAAA' }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Avatar sx={{ background: theme.palette.secondary.dark }}/>
                        <Typography color="secondary.contrastText" fontWeight="600">
                            {user?.name}
                        </Typography>
                    </Stack>
                </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={switchTheme} sx={{ p: 2 }}>
                { theme.palette.mode === 'light' ? (
                    <>
                        <DarkMode sx={{ color: theme.palette.secondary.dark }} />
                        <Typography ml={1} color="secondary.contrastText">Dark</Typography>
                    </>
                ) : (
                    <>
                        <LightMode sx={{ color: theme.palette.secondary.dark }} />
                        <Typography ml={1} color="secondary.contrastText">Light</Typography>
                    </>
                )}
            </MenuItem>
            <MenuItem onClick={handleSignOut} sx={{ p: 2 }}>
                <Logout sx={{ color: theme.palette.secondary.dark }}/>
                <Typography ml={1} color="secondary.contrastText">
                    Logout
                </Typography>
            </MenuItem>
        </Menu>
        </>
    );
}
