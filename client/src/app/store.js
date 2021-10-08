import  useReducer  from '../slice/userSlice'
import counterReducer from '../slice/counterSlice'

const  { configureStore } = require('@reduxjs/toolkit')


const rootReducer = {
    socket : counterReducer,
    user: useReducer,
    
}



const store = configureStore({
    reducer : rootReducer,
})
export default store