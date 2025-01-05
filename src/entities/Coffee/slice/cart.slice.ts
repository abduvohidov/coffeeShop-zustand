import {StateCreator} from "zustand";
import axios from "axios";
import {Actions, CartActions, CartState, Middleware, OrderCoffeeRes, OrderItem, States} from "../../types.ts";
import {BASE_URL} from "../../../shared/api";

export const cartSlice: StateCreator<States & Actions, Middleware, Middleware, CartActions & CartState> = (set, get) => ({
    cart: undefined,
    address: undefined,
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
    clearCart: () => set({cart: undefined}),
    setAddress: (address) => set({ address }),
})
