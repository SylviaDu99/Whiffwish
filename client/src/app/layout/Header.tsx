import { AppBar, Toolbar, Typography, InputBase, Button, IconButton, Box, Badge, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { useEffect, useState } from "react";

export default function Header() {
    const {cart} = useAppSelector(state => state.cart);
    const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0);
    const navigate = useNavigate();
    const location = useLocation();

    // Function to parse query parameters
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const [searchTerm, setSearchTerm] = useState(query.get('keyword') || '');

    useEffect(() => {
        // Update searchTerm from URL when location changes
        setSearchTerm(query.get('keyword') || '');
    }, [location]);

    const handleSearch = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent) => {
        if ((event.type === 'click' || (event as React.KeyboardEvent).key === 'Enter') && searchTerm.trim()) {
            navigate(`/search_result?keyword=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <AppBar position='fixed' elevation={0} color="transparent" sx={{ backgroundColor: 'white', mb: 4 }}>
            <Toolbar>
                {/* Logo on the left */}
                <Typography variant='h6' color="primary" 
                            component={NavLink} to={"/catalog"}
                            sx={{ marginRight: 2, textDecoration: "none"}}>
                    WhiffWish
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
                    margin: '0 auto',
                    paddingTop: '4px', 
                    paddingRight: '4px', 
                    paddingBottom: '4px',
                    paddingLeft: '4px'
                }}>
                    <InputBase
                        sx={{ paddingLeft: '1rem', paddingRight: '1rem', width: '100%' }}
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearch}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
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
