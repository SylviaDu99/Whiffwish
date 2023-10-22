import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

interface Props {
    product: Product;
}
export default function ProductCard({product}: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    return (

        <Card sx={{ borderRadius: '16px'}} elevation={0}>
            <Box position="relative">
                <CardMedia
                    component="img"
                    image={product.pictureUrl}
                    title={product.name}
                    sx={{ borderRadius: '16px' }}
                />
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
                    onClick = {() => setIsClicked(true)}
                >
                    <FavoriteIcon />
                </IconButton>
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {product.name}
                </Typography>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography gutterBottom variant="h6">
                            ${(product.price/100).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size="small" aria-label="add to shopping cart">
                            <ShoppingCartIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body2">
                    {product.brand} | {product.type}
                </Typography>
            </CardContent>
            <CardHeader
                avatar={
                    <Avatar>
                        {product.sellerId ? product.sellerId.toString().charAt(0) : 'C'}
                    </Avatar>
                }
                title={product.sellerId ? product.sellerId.toString() : 'Celia'}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold'},
                }}
            />
        </Card>
    )
}
