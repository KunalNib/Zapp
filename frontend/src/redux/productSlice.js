import { createSlice } from "@reduxjs/toolkit"

const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        cart:[],
        addresses:[],
        selectedAddress:null 
    },reducers:{
        setProduct:(state,action)=>{
            state.products=action.payload
        },
        setCart:(state,action)=>{
            state.cart=action.payload
        },

        //----Addresses :)
        addAddress:(state,action)=>{
            if(!state.addresses) state.addresses=[];
            state.addresses.push(action.payload)
        },
        setSelectedAddress:(state,action)=>{
            state.selectedAddress=action.payload
        },
        deleteAddress:(state,action)=>{
            state.addresses=state.addresses.filter((_,index)=>index!==action.payload)

            if(state.selectedAddress===action.payload){
                state.selectedAddress=null;
            }
        }
    }
})
export const {setProduct,setCart,addAddress,setSelectedAddress,deleteAddress,seletedAddress}=productSlice.actions;
export default productSlice.reducer;