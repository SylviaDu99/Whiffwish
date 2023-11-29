import { Grid } from "@mui/material";
import { Button } from "react-bootstrap";

interface Props {
    options: any[];
    onClick: (value: any) => void; // Update the type here to reflect that it's a value, not an event
}

export default function TagButtonGroup({ options, onClick }: Props) {
    return (
        <>
            <Grid item>
                <Button
                    variant="text"
                    onClick={() => onClick('')}
                >
                    Recommended</Button>
            </Grid>
            {options.map((value, index) => (
                <Grid item key={index}>
                    <Button
                        variant="text"
                        onClick={() => onClick(value)} // Pass the value instead of the event
                    >
                        {value}
                    </Button>
                </Grid>
            ))}
        </>
    );
}
