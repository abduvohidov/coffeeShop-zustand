import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {listSlice} from "../slice/list.slice.ts";
import {Actions, GetCoffeeListReqParams, States} from "../../types.ts";
import {cartSlice} from "../slice/cart.slice.ts";


export const useCoffeeStore = create<Actions & States>()(
    devtools(
        persist((...args) => ({...listSlice(...args), ...cartSlice(...args)}), {
            name: "coffee-store",
            partialize: (state) => ({cart: state.cart, address: state.address})
        }),
        {name: "coffee-store"}
    )
);

export const getCoffeeList = (params?: GetCoffeeListReqParams) =>
    useCoffeeStore.getState().getCoffeeList(params);
