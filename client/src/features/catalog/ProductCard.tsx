import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync} from "../cart/cartSlice";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const {status} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    return (
            <Card sx={{ borderRadius: '16px'}} elevation={0} >
                <Box position="relative">
                    <Link to={`/product/${product.id}`}>
                        <CardMedia
                            component="img"
                            image={product.pictureUrl}
                            title={product.name}
                            sx={{ borderRadius: '16px' }}
                        />
                    </Link>
                    <IconButton 
                        sx={{ 
                            position: 'absolute', 
                            top: 8, 
                            right: 8,
                            opacity: isHovered || isClicked ? 1 : 0, 
                            transition: 'opacity 0.2s'}}
                        size="small"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsClicked(true)}
                    >
                        <FavoriteIcon />
                    </IconButton>
                </Box>
                <CardContent sx={{ padding: '6px' }}>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="body2" fontWeight={'bold'}>
                            {product.name}
                        </Typography>
                    </Link>
                    <Typography variant='body2'>
                        {product.rating?.toFixed(1) || "NEW!"} 
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" fontWeight={'bold'}>
                                ${(product.price/100).toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item>
                        <IconButton 
                            size="small" 
                            sx={{ padding: '0.5rem'}} 
                            onClick={() => dispatch(addCartItemAsync({productId: product.id, quantity: 1}))}>
                            {status.includes('pendingAddItem'+product.id) ? <CircularProgress size={16} /> : <ShoppingCartIcon color='primary' sx={{ fontSize: '1rem'}} />}
                        </IconButton>
                        </Grid>
                    </Grid>
                    <Typography variant="body2">
                        {product.brand} | {product.type}
                    </Typography>
                </CardContent>

                <CardHeader sx={{ padding: '6px' }}
                    avatar={
                        <Avatar sx={{ width: '16px', height: '16px', fontSize: '0.6rem' }}>
                            {product.sellerId ? product.sellerId.toString().charAt(0) : 'C'}
                        </Avatar>
                    }
                    title={product.sellerId ? product.sellerId.toString() : 'Celia'}
                    titleTypographyProps={{ sx: { marginLeft:-1.3,fontSize:'0.7rem' } }}
                />
            </Card>
    )
}
