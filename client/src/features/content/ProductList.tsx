import { Grid, Box } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    if (!Array.isArray(products) || products.length === 0) {
        return <Box>No products available.</Box>;
    }

    const columns: Product[][] = [[], [], [], [], []];
    products.forEach((product, index) => {
        columns[index % 5].push(product);
    });

    return (
        <Box marginTop={0} >
            <Grid container spacing={3}>
                {columns.map((columnProducts, colIndex) => (
                    <Grid item xs={2.3} key={colIndex}>
                        <Box display="flex" flexDirection="column">
                            {columnProducts.map((product) => (
                                <Box marginBottom={2} key={product.id}>
                                    <ProductCard product={product} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
