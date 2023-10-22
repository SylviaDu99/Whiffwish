import { Grid, Box } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const columns: Product[][] = [[], [], [], []];
    products.forEach((product, index) => {
        columns[index % 4].push(product);
    });

    return (
        <Grid container spacing={4}>
            {columns.map((columnProducts, colIndex) => (
                <Grid item xs={3} key={colIndex}>
                    <Box display="flex" flexDirection="column">
                        {columnProducts.map((product) => (
                            <Box marginBottom={4} key={product.id}>
                                <ProductCard product={product} />
                            </Box>
                        ))}
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
