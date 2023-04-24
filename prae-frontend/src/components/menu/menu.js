import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Typography,
} from '@mui/material';
import {
    Home as HomeIcon,
    Book as BookIcon,
    AccountCircle as AccountCircleIcon,
    Menu as MenuIcon,
    Close as CloseIcon,
} from '@mui/icons-material';

const Menu = () => {
    const [open, setOpen] = useState(true);

    const items = [
        { label: 'Página inicial', icon: <HomeIcon />, path: '/' },
        { label: 'Livros', icon: <BookIcon />, path: '/books' },
        { label: 'Usuários', icon: <AccountCircleIcon />, path: '/user' },
    ];

    const handleToggle = () => setOpen(!open);

    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton
                onClick={handleToggle}
                sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1 }}
            >
                {open ? (
                    <CloseIcon sx={{ fontSize: 36, color: '#2196F3' }} />
                ) : (
                    <MenuIcon sx={{ fontSize: 36, color: '#2196F3' }} />
                )}
            </IconButton>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
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
                        <ListItem
                            key={index}
                            button
                            to={path}
                            sx={{
                                borderRadius: 8,
                                mb: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#64B5F6',
                                    color: '#fff',
                                },
                            }}
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
                    ))}
                </List>
                <Divider sx={{ mt: 'auto', mb: 1, backgroundColor: '#fff' }} />
                <div sx={{ display: 'flex', justifyContent: 'flex-end', mr: 16 }}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: '#fff' }} />
                    </IconButton>
                </div>
            </Drawer>
        </>
    );
};

export default Menu;