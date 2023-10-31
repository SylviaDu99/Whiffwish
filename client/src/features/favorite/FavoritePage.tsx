import { ButtonGroup, Typography } from "@mui/material";
import { Button, Container } from "react-bootstrap";
import Header from "../../app/layout/Header";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export default function FavoritePage() { 
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.counter.data);
    return (
        <Container>
            <Header/>
            <Typography marginTop={10}> Favorite Page </Typography>
            <Typography> {data} </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment())}> Increment </Button>
                <Button onClick={() => dispatch(decrement())}> Decrement </Button>
                <Button onClick={() => dispatch(incrementByAmount(5))}>+amount</Button>
            </ButtonGroup>
        </Container>
    )

}