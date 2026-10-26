import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0,
  },

  reducers: {
    increment: (state) => {
      // state is the whole object { value: 0}
      state.value += 1;     
    },
        
           /* 
           Normally, in JavaScript and Redux, you are not allowed to mutate (change) objects directly. 
           You always have to return a brand-new object. so 'state.value += 1' works differently in RTK
           Redux Toolkit changes this rule by wrapping your state in Immer. Here is how Immer helps you:
          
           The Draft Copy: When Redux calls your increment function, it doesn't give you the actual state { value: 0}. 
           It gives you a temporary "draft" copy of the state (which looks and acts just like your real state).

           The Mutation: When you write state.value += 1;, you are actually modifying that temporary draft copy.

           Behind-the-Scenes Cleanup: Because you used curly braces {}, your function finishes without returning anything (it returns undefined).

           Immer Steps In: Immer notices that you modified the draft. It takes your changes, automatically builds a brand-new, immutable state object for you behind the scenes ({ value: 1 }), and hands that new object back to Redux.
          */
 
         

    decrement: (state) =>         
      { if (state.value > 0){
        state.value -= 1
      }
      },

      increaseByAmount: (state, action) => {
        state.value += action.payload  // action.payload holds whatever data was passed in!
      },

    
  },
});

export const { increment, decrement, increaseByAmount } = counterSlice.actions;
{
  /* 
  increment and decrement are called actions. The ' name: "counter" is only there to generate action type strings. whenever
  you call increment(), Redux uses this name as a prefix to build the action type:
              name ("counter") + "/" + reducer ("increment") = "counter/increment".

  counterSlice.actions is a JavaScript object that contains multiple functions inside it (increment, decrement, and potentially more if you add them later).
  Because it's an object, we use destructuring ({ increment, decrement }) to pull out exactly the actions we want.

  How you import it later: Because these are named exports, when you import them into a React component, you must use curly braces and match the exact names:
               import { increment, decrement } from './counterSlice';
  */
}
export default counterSlice.reducer;
{/*
  How you import it later: Because it's the default export, when you import it into your store, you do not use curly braces, and you can name it whatever you want (like counterReducer, banana, or myReducer):
                  import counterReducer from './counterSlice'; // Named it whatever we want!
        note: you can only have one default export per file.
  */}
