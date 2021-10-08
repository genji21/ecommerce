import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const counterSlice = createSlice({
 name: 'counters',
 initialState: 0,
 reducers: {
 increase(state) {
    return state + 1
 },
 decrease(state) {
     return state - 1
 }
 }
});
const {actions,reducer} =  counterSlice;
export const {increase,decrease} = actions
export default reducer;