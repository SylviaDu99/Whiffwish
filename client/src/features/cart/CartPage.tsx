import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Header from "../../app/layout/Header";
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync, removeCartItemAsync } from "./cartSlice";

export default function CartPage() {
    const { cart: cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    const deliveryFee = 999; //Todo: get from backend

    if (!cart || cart.items.length === 0) return (
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

    const totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
                            {cart.items.map(item => (
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
                                            loading={status === 'pendingRemoveItem' + item.productId + "remove"}
                                            onClick={() => dispatch(removeCartItemAsync({productId: item.productId, quantity: 1, name: "remove"}))}>
                                            <Remove />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton
                                            loading={status === 'pendingAddItem' + item.productId}
                                            onClick={() => dispatch(addCartItemAsync({productId: item.productId, quantity: 1}))}>
                                            <Add />
                                        </LoadingButton>
                                    </TableCell>
                                    <TableCell align="center">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <LoadingButton
                                            loading={status === 'pendingRemoveItem' + item.productId + "delete"}
                                            onClick={() => dispatch(removeCartItemAsync({productId: item.productId, quantity: item.quantity, name: "delete"}))}
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