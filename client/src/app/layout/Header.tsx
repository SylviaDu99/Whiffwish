import { AppBar, Toolbar, Typography, InputBase, Button, IconButton, Box, Badge, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

export default function Header() {
    const {basket} = useAppSelector(state => state.cart);
    const itemCount = basket?.items.reduce((acc, item) => acc + item.quantity, 0);

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
                    borderRadius: '20px', 
                    backgroundColor: 'rgba(244, 244, 244, 1)', 
                    display: 'flex', 
                    alignItems: 'center',
                    maxWidth: '400px',
                    margin: '0 auto', // centers the box in the available space
                    paddingTop: '4px', 
                    paddingRight: '4px', 
                    paddingBottom: '4px',
                    paddingLeft: '4px'
                }}>
                    <InputBase
                        sx={{ paddingLeft: '1rem', paddingRight: '1rem', width: '100%' }}
                        placeholder="Search..."
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    {/* <Button variant="contained" color="primary" sx={{ 
                        borderRadius: '20px 20px 20px 20px', 
                        color: '#333333', 
                        textTransform: 'none',
                        paddingTop: '4px', 
                        paddingRight: '20px', 
                        paddingBottom: '4px', 
                        paddingLeft: '20px',
                        boxShadow: 'none',
                        '&:hover': {  // hover styles
                            backgroundColor: '#333',  // some darker shade for example
                            color: '#fff'  // making the text/icon white on hover
                        }
                        }}>
                        Search
                        <SearchIcon sx={{ marginLeft: '0.2rem', fontSize: '1.2rem'}} />
                    </Button> */}
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
                        sx={{ marginRight: 2 }}
                        component={NavLink} 
                        to={"/cart"}
                    >
                        <Badge 
                            badgeContent={itemCount} 
                            color="primary"
                            sx={{
                                '.MuiBadge-badge': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '1rem',
                                    width: '1rem',
                                    minWidth: '1rem',
                                    fontSize: '0.75rem'
                                }
                            }}
                        >
                            <ShoppingCartIcon sx={{ fontSize: '1.2rem' }}/>
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
