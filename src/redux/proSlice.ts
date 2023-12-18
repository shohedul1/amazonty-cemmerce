import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../type';


interface StoreState {
    productData: ProductType[];
    userInfo: null | string;
    orderData: ProductType[];
    favoriteData:ProductType[];
}

const initialState: StoreState = {
    productData:[],
    userInfo: null,
    orderData: [],
    favoriteData: [],
};

export const proSlice = createSlice({
    name:'pro',
    initialState,
    reducers:{ 
        addToCart:(state,action)=>{
            const existingProduct = state.productData.find((item:ProductType)=> item.id == action.payload.id);

            if(existingProduct){
                existingProduct.attributes.quantity += action.payload.attributes.quantity
            }else{
                state.productData.push(action.payload);
            }
        },

        increaseQuantity:(state,action)=>{
            const existingProduct = state.productData.find(
                (item:ProductType)=>item.id === action.payload.id
            );
            existingProduct && existingProduct.attributes.quantity++;
        },

        decreaseQuantity:(state,action)=>{
            const existingProduct = state.productData.find(
                (item: ProductType)=> item.id === action.payload.id
            );
            if(existingProduct?.attributes?.quantity === 1){
                existingProduct.attributes.quantity === 1;
            }else{
                existingProduct && existingProduct.attributes.quantity--;
            }
        },

        deleteProduct: (state,action)=>{
            state.productData = state.productData.filter(
                (item)=> item.id !== action.payload
            );
        },

        resetCart: (state)=>{
            state.productData = [];
        },

        addToFavorite: (state,action)=>{
            const existingProduct = state.favoriteData.find(
                (item:ProductType)=> item.id === action.payload.id
            );
            if(existingProduct){
                state.favoriteData = state.favoriteData.filter(
                    (item)=> item.id !== action.payload.id
                );
            }else{
                state.favoriteData.push(action.payload);
            }
        },

        deleteFavorite: (state, action)=>{
            state.favoriteData = state.favoriteData.filter(
                (item) => item.id !== action.payload
            );
        },

        resetFavorite: (state)=>{
            state.favoriteData = [];
        },

        addUser: (state,action)=>{
            state.userInfo = action.payload;
        },

        deleteUser:(state)=>{
            state.userInfo = null;
        },

        addOrder: (state,action)=>{
            const existingProduct = state.orderData.find(
                (item: ProductType) => item.id === action.payload.id
            );
            if(existingProduct){
                state.orderData.push(action.payload);
            }else{
                state.orderData = action.payload;
            }
        },
        resetOrder:(state)=>{
            state.orderData =[];
        },
    }
});

export const { 
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct,
    resetCart,
    addToFavorite,
    deleteFavorite,
    resetFavorite,
    addUser,
    deleteUser,
    addOrder,
    resetOrder,

 } =proSlice.actions;

export default proSlice.reducer;

