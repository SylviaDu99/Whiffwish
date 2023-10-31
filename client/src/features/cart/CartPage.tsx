import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Header from "../../app/layout/Header";
import agent from "../../app/api/agent";
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./cartSlice";

export default function CartPage() {
    const { basket } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });
    const deliveryFee = 999; //Todo: get from backend


    function handleAddItem(productId: number, name: string) {
        setStatus({ loading: true, name: name })
        agent.Basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string) {
        setStatus({ loading: true, name: name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => dispatch(removeItem({productId, quantity})))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }


    if (!basket || basket.items.length === 0) return (
        <>
            <Header />
            <div style={{ height: '68px' }}></div>
            <Container>
                <TableContainer component={Paper} sx = {{boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.05)"}}>
                    <Table sx={{ minWidth: 650 }} >
                        <TableBody>
                        {
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
                                    Your cart is currently empty.
                                </TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )

    const totalPrice = basket.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            <Header />
            <div style={{ height: '68px' }}></div>
            <Container>
                <TableContainer component={Paper} sx = {{boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.05)"}}>
                    <Table sx={{ minWidth: 650 }} >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Product</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Subtotal</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {basket.items.map(item => (
                                <TableRow
                                    key={item.productId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: "100px", width: "100px" }} />
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="center">${(item.price / 100).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <LoadingButton
                                            loading={status.loading && status.name === 'rem' + item.productId}
                                            onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}>
                                            <Remove />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton
                                            loading={status.loading && status.name === 'add' + item.productId}
                                            onClick={() => handleAddItem(item.productId, 'add' + item.productId)}>
                                            <Add />
                                        </LoadingButton>
                                    </TableCell>
                                    <TableCell align="center">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <LoadingButton
                                            loading={status.loading && status.name === 'del' + item.productId}
                                            onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
                                        >
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* Subtotal */}
                            <TableRow>
                                <TableCell colSpan={5} align="right"><Typography variant="subtitle2">Subtotal: </Typography></TableCell>
                                <TableCell align="right"><Typography variant="subtitle2">${(totalPrice / 100).toFixed(2)}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={5} align="right"><Typography variant="subtitle2">Shipping fee: </Typography></TableCell>
                                <TableCell align="right"><Typography variant="subtitle2">${(deliveryFee / 100).toFixed(2)}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={5} align="right"><Typography variant="subtitle2">Total: </Typography></TableCell>
                                <TableCell align="right"><Typography variant="subtitle2">${((totalPrice + deliveryFee) / 100).toFixed(2)}</Typography></TableCell>
                            </TableRow>

                            {/* Checkout button */}
                            <TableRow>
                                <TableCell colSpan={6} align="right">
                                    <Button 
                                        component={Link}
                                        to="/checkout"
                                        variant="contained" 
                                        color="primary" 
                                        size="large"
                                        sx = {{boxShadow: "none", borderRadius:"16px"}}
                                    >
                                        Checkout
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}