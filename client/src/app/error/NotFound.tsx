import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component = {Paper} elevation={0}>
            <Typography variant="h5" align="center" gutterBottom>
                Not Found
            </Typography>
            <Divider/>
            <Button fullWidth component={Link} to="/catalog" variant="contained" color="primary">Go back to catalog</Button>
        </Container>
    )
}