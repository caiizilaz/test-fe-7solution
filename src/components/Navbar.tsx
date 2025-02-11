import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const navItems = [
    { label: 'Assignment 1', path: '/' },
    { label: 'Assignment 2', path: '/second' },
  ];

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold'
          }}
        >
          7-Solutions Test
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map(({ label, path }) => (
            <Button
              key={path}
              color="inherit"
              onClick={() => router.push(path)}
              sx={{
                fontWeight: router.pathname === path ? 'bold' : 'normal',
                textDecoration: router.pathname === path ? 'underline' : 'none'
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 