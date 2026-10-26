import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice'

export const store = configureStore({
    reducer: {                     // RTK specifically looks for the key named reducer to know where your application's root reducer lives.
        appScore: counterReducer    // appScore is a custom name of that specific slice inside your global Redux state tree.

    }
})

/*
reducer" {
    counter: counterReducer 
}   
    The Default Export (counterSlice.reducer) from counterSlice.js handed over master reducer function which
    we imported in the line 
              import counterReducer from './features/counterSlice'
    so counterReducer is the master reducer function.

*/
