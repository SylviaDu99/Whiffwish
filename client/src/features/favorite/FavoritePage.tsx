import { Alert, AlertTitle, List, ListItem, ListItemText, Typography } from "@mui/material";
import Header from "../../app/layout/Header";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function FavoritePage() { 
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationErrors() {
        agent.TestErrors.getValidationError()
        .then(() => console.log("wrong response"))
        .catch(error => setValidationErrors(error));
    }

    return (
        <Container style={{ padding: '32px' }}>
            <Header />
            <Typography> Favorite Page </Typography>
            <ButtonGroup>
                <Button variant="contained" onClick={()=> agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401</Button>
                <Button variant="contained" onClick={()=> agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404</Button> 
                <Button variant="contained" onClick={()=> agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500</Button>
                <Button variant="contained" onClick={getValidationErrors}>Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                        
                    </List>
                </Alert>
            }
        </Container>
        
    )

}