import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  increaseByAmount,
} from "./redux/features/counterSlice";

const App = () => {
  // 1. READ DATA: useSelector looks into the store, finds 'appScore', and grabs 'value'
  const count = useSelector((state) => state.appScore.value);
  {
    /*       
      Think of the Redux store as a giant, multi-drawer filing cabinet.
      Redux State Tree: since we have 'appScore: counterReducer' in our store.js, the global state tree looks like this under the hood:
      
      {
        appScore: {
          value: 0
        }
      }
        The root object {} is the whole tree (the filing cabinet).
        appScore is just one drawer inside that cabinet.
        { value: 0 } is the data living inside that drawer.

                     state:    This represents the entire global state tree (the whole cabinet)
            state.appScore:    You are telling Redux, "Look at the tree, and open the drawer labeled appScore."
      state.appScore.value:    "Now, look inside that drawer and grab the value property."
    */
  }

  // 2. DISPATCH ACTIONS: useDispatch gives us the tool to send signals back to Redux
  const dispatch = useDispatch();

  //Local state for the input box value
  const [customAmount, setCustomAmount] = useState("10");

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full">
        <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
          Redux Counter
        </h2>

        {/* Counter Display */}
        <h1 className="text-6xl font-extrabold text-indigo-400 my-6 tracking-tight">
          {count}
        </h1>

        {/* Buttons Container */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 w-full">
            <button
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-150 ease-in-out cursor-pointer text-center"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>

            {/* In the line onClick={() => dispatch(increment())} :
            Step 1: increment() runs first (The Action Creator):
                    Before dispatch even touches anything, JavaScript runs increment().
                    Because increment is an Action Creator function created by Redux Toolkit, running it builds and returns a plain JavaScript object.
                    That returned object looks like this:
                    { type: "counter/increment" }
            Step 2: dispatch() runs second:
                    Now that increment() has finished and handed over its resulting object, dispatch(...) takes that object and throws it into the central Redux store.
                    It is literally doing this: dispatch({ type: "counter/increment" }).
            Step 3: The Store passes it to your Reducer
                    The central Redux store catches that action object and says, "Alright, let's hand this to our reducer (counterReducer)."
            Step 4: Your Slice code executes
                    Your reducer inside counterSlice.js catches the action, checks its type ("counter/increment"), and runs your exact logic:
                         
                           increment: (state) => {
                                state.value += 1 // <--- This runs, changing value from 0 to 1
                           }
            Step 5: React re-renders
                    Because the data in the store changed, useSelector notices the update, forces your App component to re-render, and your screen instantly updates from 0 to 1.
          */}

            <button
              className={`flex-1 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-150 ease-in-out text-center border ${
                count === 0
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50 border-slate-700"
                  : "bg-slate-700 hover:bg-slate-600 active:scale-95 cursor-pointer border-slate-700"
              }`}
              onClick={() => dispatch(decrement())}
              disabled={count === 0}
            >
              Decrement
            </button>
          </div>

          <div className="flex gap-2 w-full">
            <input
              type="number"
              className="flex-1 bg-slate-900 border border-slate-700 text-white text-center font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all"
              placeholder="Amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <button
              className="flex-1 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-150 ease-in-out cursor-pointer text-center text-sm"
              onClick={() =>
                dispatch(increaseByAmount(Number(customAmount) || 0))
              } // in casae the user type any weird things, the OR operator saves the day: if (Number(customAmount)) evalutes to valid number, use that. If not then fall back to whatever is on the right side (i.e. 0)
            >
              Increase by Amount
            </button>
          </div>

          {/*
          When you ran incrementByAmount(10), Redux Toolkit automatically built an action object that looked like this:
                  {
                    type: "counter/incrementByAmount",
                    payload: 10 // <--- Your data got tucked safely into .payload!
                  }  
                    
          If you look at the object generated by calling increment() with nothing inside the parentheses, it doesn't have a payload property at all:
          */}
        </div>
      </div>
    </div>
  );
};

export default App;
