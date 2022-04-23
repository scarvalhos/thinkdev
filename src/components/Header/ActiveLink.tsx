import { ReactElement, cloneElement } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface ActiveLinkProps  {
    children: ReactElement;
    href: string;
    styles: {};
}

export function ActiveLink({ children, href, styles }: ActiveLinkProps) {
    const { pathname } = useLocation();

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

const style = {
    active: {
        fontWeight: 600,
        textDecoration: 'none',
        padding: '15px 10px',
        color: '#000000',
        borderBottom: '2px solid #000'
    }
};
