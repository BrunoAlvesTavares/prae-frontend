import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
} from '@mui/material';
import {
    Home as HomeIcon,
    Book as BookIcon,
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import { Link } from 'react-router-dom';
const CACHE_CURRENT_USER = "@current-User";

const Menu = () => {
    const [selectedIndex, setSelectedIndex] = useState();
    const user = JSON.parse(localStorage.getItem(CACHE_CURRENT_USER));
    const items = [
        { label: 'Página inicial', icon: <HomeIcon />, path: '/home' },
        { label: 'Livros', icon: <BookIcon />, path: '/books' },
        { label: 'Reservas', icon: <BookmarksIcon />, path: '/reservedBooks' },
        { label: 'Quem somos', icon: <LiveHelpIcon />, path: '/infos' },
        { label: 'Sair', icon: <MeetingRoomIcon />, path: '/logout' },
    ];
    if (user.accessLevel === 'admin') {
        items.splice(2, 0, { label: 'Usuários', icon: <AccountCircleIcon />, path: '/users' });
    }

    return (
        <>
            <Drawer
                variant="persistent"
                anchor="left"
                open={true}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '#2196F3',
                        color: '#fff',
                    },
                }}
            >
                <div sx={{ mt: 24, ml: 16 }}>
                    <Typography align="center" variant="h6" sx={{ color: '#fff', paddingTop: '10px' }}>
                        PRAE
                    </Typography>
                </div>
                <Divider sx={{ mt: 1, mb: 2, backgroundColor: '#fff' }} />
                <List>
                    {items.map(({ label, icon, path }, index) => (
                        <Link
                        to={path}
                        key={index}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <ListItem
                            button
                            sx={{
                                borderRadius: 8,
                                mb: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#64B5F6',
                                    color: '#fff',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
                                },
                            }}
                            selected={selectedIndex === index} 
                            onClick={() => setSelectedIndex(index)} 
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: 'subtitle1',
                                    sx: { color: '#fff' },
                                }}
                                primary={label}
                            />
                        </ListItem>
                    </Link>
                    ))}
                </List>
                <Divider sx={{ mt: 'auto', mb: 1, backgroundColor: '#fff' }} />
            </Drawer>
        </>
    );
};

export default Menu;
