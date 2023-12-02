import React from 'react';
import { Link } from 'react-router-dom';
// material components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
// libs
import { api } from '../../utils/constants';

export const TopMenu = (props) => {
    const [anchor, setAnchor] = React.useState(null);
    const [dropdown, setDropdown] = React.useState(false);
    const switchDropdown = () => {
        setDropdown(!Boolean(anchor))
        setAnchor(null)
        props.state(null);
    }

    React.useEffect(() => {
        setDropdown(!Boolean(props.anchor));
        if(dropdown) {
            setAnchor(props.anchor)
        }
    },[props.anchor])

    return (
        <Menu
            anchorEl={anchor}
            id="account-menu"
            open={Boolean(anchor)}
            onClose={switchDropdown}
            onClick={switchDropdown}
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
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
                <Link to={api.adminPrefix + api.logoutUrl} className="menu-link MuiMenuItem-root">
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <span>Logout</span>
                </Link>
            </MenuItem>
        </Menu>
    )
}

export default TopMenu;
