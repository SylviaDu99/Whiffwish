import { Backdrop, Box, Grid, Typography, IconButton, Divider, Avatar, CardHeader, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Product } from '../../app/models/product';
import agent from '../../app/api/agent';
import NotFound from '../../app/error/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductDetails() {
    const {basket, setBasket, removeItem} = useStoreContext();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Get the navigate function
    const [quantity, setQuantity] = useState(0); // Default quantity is 1
    const [submitting, setSubmitting] = useState(false); // Default submitting is false
    const item = basket?.items.find(item => item.productId === product?.id);
    
    useEffect(() => {
        if (item) setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id, item]);
    
    function handleQuantityChange(event: any) {
        if (event.target.value <= 0) return;
        setQuantity(event.target.value);
    }

    function handleUpdateCart() {
        if (!product) return;
        setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const undatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product.id!, undatedQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product.id!, item.quantity - quantity)
                .then(() => removeItem(product.id!, updatedQuantity))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }
    }

    if (loading) return <LoadingComponent message='Fetching the post...'/>
    if (!product) return <NotFound />

    return (
        <Backdrop open={true} style={{ zIndex: 1, color: '#dddddd', backgroundColor: 'rgba(0,0,0,0.02)' }}>
            <Box 
                maxWidth="900px" 
                position="relative" 
                boxShadow="0px 3px 10px rgba(0, 0, 0, 0.05)"
                borderRadius="16px" 
                bgcolor = "white"
                height="90vh"
                overflow="hidden"
            >
                <IconButton 
                    onClick={() => navigate(-1)}
                    style={{ position: 'absolute', right: 8, top: 8 }} 
                >
                    <CloseIcon />
                </IconButton>

                <Grid container style={{ height: '100%', maxHeight: '90vh'}}>
                    <Grid item xs={7} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1, backgroundColor: 'black' }}></div>
                        <div>
                            <img src={product.pictureUrl} alt={product.name} style={{ width: '100%'}} />
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'black' }}></div>
                    </Grid>

                    <Grid item xs={5} padding={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            <CardHeader 
                                sx={{padding: '0', marginBottom: '1rem'}}
                                avatar={
                                    <Avatar sx={{ width: '32px', height: '32px', fontSize: '1rem' }}>
                                        {product.sellerId ? product.sellerId.toString().charAt(0) : 'C'}
                                    </Avatar>
                                }
                                title={product.sellerId ? product.sellerId.toString() : 'Celia'}
                                titleTypographyProps={{ sx: { marginLeft:-1.3,fontSize:'0.8rem',color:"black" } }}
                            />
                            <Typography variant='body1' color={'black'} sx={{fontWeight:'bold'}}>{product.name}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant='h6' color={'black'} sx={{fontWeight:'bold'}}>
                                    ${(product.price/100).toFixed(2)}
                                </Typography>
                                <Typography variant='body2' color={'grey'}>{(product.quantityInStock >0) ? "In stock": "Out of stock"}</Typography>
                            </Box>

                            <Typography variant='body2' color={'black'}>
                                {product.description}
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 3 }}>
                                <Button size="small" sx = {{backgroundColor: "#e2e2e2", color: "black"}}>Tag 1</Button>
                                <Button size="small" sx = {{backgroundColor: "#e2e2e2",color: "black"}}>Tag 2</Button>
                                <Button size="small"  sx = {{backgroundColor: "#e2e2e2",color: "black"}}>Tag 3</Button>
                                {/* Add more tags as needed */}
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 3, gap: 1 }}>
                                <TextField
                                    onChange={handleQuantityChange}
                                    fullWidth 
                                    type = "number"
                                    value = {quantity}
                                    label = "Quantity in Cart"
                                    sx={{ width: '50%', 
                                        '& .MuiInputBase-root': {
                                            height: '35px',
                                            alignItems: 'center'
                                        } }} />
                                <LoadingButton 
                                    disabled={quantity === item?.quantity || !item && quantity === 0}
                                    loading={submitting}
                                    onClick={handleUpdateCart}
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth 
                                    sx={{ width: '50%', height: '35px', boxShadow: 'none' }}>
                                    {item ? 'Update Cart' : 'Add to Cart'}
                                </LoadingButton>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop:2, gap: 1 }}>
                                <Button 
                                    variant="contained" 
                                    sx={{height: '35px', backgroundColor:"#e2e2e2", flexGrow: 1, boxShadow: 'none'}}
                                    startIcon={<FavoriteBorderIcon />}
                                >
                                    Add to Favorites
                                </Button>
                            </Box>

                            
                            {/* Date of post */}
                            <Grid>
                                <Typography color="grey" style={{whiteSpace: 'nowrap'}} fontSize={'0.8rem'} marginTop={1} >
                                    Posted on: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                                </Typography>
                            </Grid>

                            <Divider sx={{ my: 2}} />
                            <Grid color="grey"><Typography variant="body2">0 Comments</Typography></Grid>
                        </Box>
                        
                        {/* Reply bar */}
                        <Box marginRight={2}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={11}>
                                    <TextField 
                                        fullWidth  
                                        sx = {{'& .MuiInputBase-root': {
                                            height: '35px',
                                            alignItems: 'center'
                                        }}} 
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <SendIcon color="primary"/>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                </Grid>
                
            </Box>
        </Backdrop>
    )
}
