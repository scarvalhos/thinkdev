import { useTheme } from '@mui/material';
import { ReactElement, cloneElement } from 'react'
import { Link, useLocation } from 'react-router-dom';

interface ActiveLinkProps  {
    children: ReactElement;
    href: string;
    styles: {};
}

export function ActiveLink({ children, href, styles }: ActiveLinkProps) {
    const { pathname } = useLocation();
    let { palette } = useTheme()

    const style = {
        active: {
            fontWeight: 600,
            textDecoration: 'none',
            padding: '11px 10px',
            color: palette.secondary .contrastText,
            borderBottom: `2px solid ${palette.secondary.contrastText}`
        }
    };

    let isActive = false

    if(pathname === href) {
        isActive = true;
    }

    return (
        <Link to={`${href}`} style={isActive ? style.active : styles} >
            {cloneElement(children, {
            })}
        </Link>
    )
}
