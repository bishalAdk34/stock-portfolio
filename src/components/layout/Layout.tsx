
import { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    AccountBalance as PortfolioIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

interface LayoutProps {
    children: React.ReactNode;
}

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Portfolio', icon: <PortfolioIcon />, path: '/portfolio' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopOpen, setDesktopOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setDesktopOpen(!desktopOpen);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const drawerContent = (
        <Box>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" color="primary">
                    Stock Portfolio
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <ListItemIcon
                                sx={{
                                    color: location.pathname === item.path
                                        ? 'primary.main'
                                        : 'inherit',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: desktopOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
                    ml: { md: desktopOpen ? `${DRAWER_WIDTH}px` : 0 },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {menuItems.find((item) => item.path === location.pathname)?.text || 'Dashboard'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, 
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="persistent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                    },
                }}
                open={desktopOpen}
            >
                {drawerContent}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: desktopOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
                    ml: { md: desktopOpen ? `${DRAWER_WIDTH}px` : 0 },
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                }}
            >
                <Toolbar /> 
                {children}
            </Box>
        </Box>
    );
};