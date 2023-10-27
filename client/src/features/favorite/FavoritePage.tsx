import { Typography } from "@mui/material";
import Header from "../../app/layout/Header";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import agent from "../../app/api/agent";

export default function FavoritePage() {    
    return (
        <Container style={{ padding: '32px' }}>
            <Header />
            <Typography> Favorite Page </Typography>
            <ButtonGroup>
                <Button variant="contained" onClick={()=> agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404</Button> 
                <Button variant="contained" onClick={()=> agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.getValidationError().catch(error => console.log(error))}>Test Validation Error</Button>
            </ButtonGroup>
        </Container>
        
    )
}