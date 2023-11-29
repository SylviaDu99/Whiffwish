import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Product, ProductParams } from '../../app/models/product';
import agent from '../../app/api/agent';
import { RootState } from '../../app/store/configureStore';

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 10,
        orderBy: 'name',
    }
}

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    types: string[];
    brands: string[];
    productParams: ProductParams;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.brands) {
        params.append('brands', productParams.brands);
    }
    if (productParams.types) {
        params.append('types', productParams.types);
    }
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            const params = getAxiosParams(thunkAPI.getState().catalog.productParams);   
            return await agent.Catalog.list(params);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (id, thunkAPI) => {
        try {
            return await agent.Catalog.details(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.filters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        types: [],
        brands: [],
        productParams: initParams(),
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },
        resetProductParams: (state) => {
            state.productsLoaded = false;
            state.productParams = initParams();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.productsLoaded = true;
            state.status = 'idle';
        })
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        })
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFecthProduct';
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        })
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        })
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        })
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.types = action.payload.types;
            state.brands = action.payload.brands;
            state.filtersLoaded = true;
            state.status = 'idle';
        })
        builder.addCase(fetchFilters.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        })
    }
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
export const { setProductParams, resetProductParams } = catalogSlice.actions;