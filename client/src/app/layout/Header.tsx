import { AppBar, Toolbar, Typography, InputBase, Button, IconButton, Box, Badge } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <AppBar position='fixed' elevation={0} color="transparent" sx={{ backgroundColor: 'white', mb: 4 }}>
            <Toolbar>
                {/* Logo on the left */}
                <Typography variant='h6' color="primary" 
                            component={NavLink} to={"/catalog"}
                            sx={{ marginRight: 2, textDecoration: "none"}}>
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
                <Box display =  'flex' alignItems = 'center' >
                    <IconButton 
                        edge="end" 
                        color="secondary" 
                        sx={{ marginRight: 2}}
                        component={NavLink} 
                        to={"/favorite"}
                    >
                        <FavoriteIcon sx={{ fontSize: '1.2rem'}}/>
                    </IconButton>

                    <IconButton 
                        edge="end" 
                        color="secondary" 
                        sx={{ marginRight: 2}}
                        component={NavLink} 
                        to={"/cart"}
                    >
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartIcon sx={{ fontSize: '1.2rem'}}/>
                        </Badge>
                    </IconButton>

                    <Button color="secondary"
                            sx={{ fontSize: '0.8rem' }} 
                            component={NavLink} 
                            to={"/login"}>
                        {"Login".toUpperCase()}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
