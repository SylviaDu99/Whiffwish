import ProductList from "./ProductList"
import Header from "../../app/layout/Header";
import { Grid } from "@mui/material";
import SideBar from "../../app/layout/SideBar";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useLocation } from "react-router-dom";


export default function SearchResult() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams();
        const useQuery = () => {
            return new URLSearchParams(location.search);
        };

        const query = useQuery();
        const searchTerm = query.get('keyword')

        params.append('pageNumber', '1');
        params.append('pageSize', '10');
        params.append('orderBy', 'name');
        if (searchTerm) params.append('searchTerm', searchTerm);
        agent.Catalog.list(params).then((response: any) => {
            setProducts(response);
        });
    }, [location.search]);

    return (
        <>
            <Header />
            <Grid container spacing={3} marginLeft={1} marginTop={10}>
                <Grid item xs={2} >
                    <SideBar />
                </Grid>

                <Grid item xs={10} spacing={1}>
                    {/* Product List */}
                    <ProductList products={products} />
                </Grid>
            </Grid>
        </>
    )
}