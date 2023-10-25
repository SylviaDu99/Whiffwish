import { Backdrop, Box, Grid, Typography, IconButton, Divider, Avatar, CardHeader } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Product } from '../../app/models/product';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Typography> Loading... </Typography>
    if (!product) return <Typography> Product not found </Typography>

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

                    <Grid item xs={5} padding={3}>
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
                        <Divider sx={{ my: 2 }} />

                        <Grid item xs={5} color="#555555"><Typography variant="body2">0 Comments</Typography></Grid>
                    </Grid>
                    
                </Grid>
                
            </Box>
        </Backdrop>
    )
}
