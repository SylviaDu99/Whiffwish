import { AppBar, Toolbar, Typography, InputBase, Button, IconButton, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
    return (
        <AppBar position='static' elevation={0} color="transparent" sx={{ backgroundColor: 'white', mb: 4 }}>
            <Toolbar>
                {/* Logo on the left */}
                <Typography variant='h6' color="primary" sx={{ marginRight: 6 }}>
                    Whiffwish
                </Typography>

                {/* Search bar in the center */}
                <Box sx={{ 
                    flexGrow: 1, 
                    position: 'relative', 
                    borderRadius: '4px', 
                    backgroundColor: 'primary.light', 
                    display: 'flex', 
                    alignItems: 'center',
                    maxWidth: '400px',
                    margin: '0 auto' // centers the box in the available space
                }}>
                    <InputBase
                        sx={{ paddingLeft: '1rem', paddingRight: '1rem', width: '100%' }}
                        startAdornment={
                            <SearchIcon sx={{ marginRight: '0.5rem' }} color="primary" />
                        }
                    />
                </Box>

                {/* Icons + Login button on the right */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="end" color="primary" sx={{ marginRight: 2 }}>
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton edge="end" color="primary" sx={{ marginRight: 2 }}>
                        <ShoppingCartIcon />
                    </IconButton>

                    <Button color="primary">
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
