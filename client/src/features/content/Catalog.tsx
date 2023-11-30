import Gallery from "./Gallery";
import ProductList from "./ProductList"
import { useEffect } from "react"
import Header from "../../app/layout/Header";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Box, Grid, Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import SideBar from "../../app/layout/SideBar";
import TagButtonGroup from "../../app/components/TagButtonGroup";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, types, metaData } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])

    if (status.includes('pending') || metaData == null) return <LoadingComponent message="Fetching Posts..." />
    const handleNextPage = () => {
        if (metaData.currentPage < metaData.totalPages) {
            dispatch(setPageNumber({ pageNumber: metaData.currentPage + 1 }));
        }
    };

    return (
        <>
            <Header />
            <Gallery />
            <Grid container spacing={3} marginLeft={1} marginTop={2}>
                <Grid item xs={2} marginTop={6.6}>
                    <SideBar />
                </Grid>

                <Grid item xs={10}>
                    {/* Tag Buttons */}
                    <Grid container spacing={1} marginBottom={2}>
                        <TagButtonGroup
                            options={types}
                            onClick={(type) => dispatch(setProductParams({ types: type }))}
                        />
                    </Grid>
                    {/* Product List */}
                    <ProductList products={products} />
                    <Box display='flex' justifyContent='center' marginTop={5}>
                        {metaData.currentPage < metaData.totalPages && (
                            <ExpandMoreIcon onClick={handleNextPage} style={{ cursor: 'pointer', fontSize: '40px' }} />
                        )}
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}