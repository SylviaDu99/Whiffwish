import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import StorefrontIcon from '@mui/icons-material/Storefront';
export default function SideBar() {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ boxShadow: "none", borderRadius: "16px", color: "#333333" }}
                startIcon={<CreateIcon />}
            >
                Create a post
            </Button>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '15px' }}
                sx={{ boxShadow: "none", borderRadius: "16px", color: "#333333" }}
                startIcon={<StorefrontIcon />}
            >
                Sell an item
            </Button>
            <Paper sx={{ mt: 2, p: 2, boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.05)" }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Post type</FormLabel>
                    <RadioGroup
                        aria-label="post-type"
                        defaultValue="all"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="all"
                            control={<Radio />}
                            label={<Typography variant="body2">All Posts</Typography>}
                        />
                        <FormControlLabel
                            value="product"
                            control={<Radio />}
                            label={<Typography variant="body2">Selling Items Only</Typography>}
                        />
                        <FormControlLabel
                            value="review"
                            control={<Radio />}
                            label={<Typography variant="body2">Reviews Only</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
            </Paper>
        </>
    )
}