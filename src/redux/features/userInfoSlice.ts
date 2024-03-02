import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: {userInfo:  {[key: string]: unknown}} = {
    userInfo: {
    },
}


export const userInfoSlice = createSlice({
    name: "userInfo", 
    initialState,
    reducers:{
        setUserInfo: <T>(state: { userInfo: T; }, action: PayloadAction<T>) => {
            state.userInfo = action.payload;
        }, 
    }
})

export const {setUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;