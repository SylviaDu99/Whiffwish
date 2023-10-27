import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError(){
    const {state} = useLocation();
    return (
        <Container component={Paper} elevation={0}>
            {state?.error? (
                <>
                    <Typography gutterBottom variant="h4" >
                        {state.error.title}
                    </Typography>
                    <Divider/>
                    <Typography gutterBottom variant="body2" >
                        {state.error.detail || "Internal Server Error"}
                    </Typography>
                </>
            ) : (
                <Typography variant="h5" align="center" gutterBottom>
                    Server Error
                </Typography>
            )}
        </Container>
    )
}