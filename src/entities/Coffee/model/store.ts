import {create, StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {CoffeeActions, CoffeeState, OrderCoffeeRes, OrderItem} from "./model";
import axios from "axios";

const BASE_URL = "https://purpleschool.ru/coffee-api";

const CoffeeSlice: StateCreator<CoffeeState & CoffeeActions, [["zustand/devtools", never], ["zustand/persist", unknown]]> = (set, get) => ({
    coffeeList: undefined,
    cart: undefined,
    address: undefined,
    getCoffeeList:  async (params) => {
        const {controller} = get();
        if(controller) {
            controller.abort();
        }

        const newController = new AbortController();
        set({controller: newController});
        const {signal} = newController;

        try {
            const { data } = await axios.get(BASE_URL, { params, signal });
            set({ coffeeList: data });
        } catch(error) {
            if(axios.isCancel(error)) return
            console.log(error)
        }
    },
    clearCart: () => set({cart: undefined}),
    setAddress: (address) => set({ address }),
    addToCart: (item) => {
        const {cart} = get();
        const {id, name, subTitle} = item;
        const preparedItem: OrderItem = {
            id,
            name: `${name} ${subTitle}`,
            size: "L",
            quantity: 1
        }

        set({cart: cart ? [...cart, preparedItem] : [preparedItem] });
    },
    orderCoffee: async () => {
        const {cart, address, clearCart} = get();
        if(!cart || !address) return;

        const orderItems = cart.map(({id, name, size, quantity}) => ({id, name, size, quantity}));
        const orderReq = {address, orderItems};

        try {
            const { data } = await axios.post<OrderCoffeeRes>(BASE_URL + "/order", orderReq);
            if(data.success) alert(data.message); clearCart();
        } catch(error) {
            throw error
        }
    },

})

const partializeState = (state: CoffeeState) => {
    const {coffeeList, cart, address} = state;
    return {coffeeList, cart, address};
}

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
    devtools(
        persist(CoffeeSlice, {name: "coffee-store", partialize: partializeState}),
        {name: "coffee-store"}
    )
);
