import {create, StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {CoffeeType} from "./model";
import axios from "axios";

const BASE_URL = "https://purpleschool.ru/coffee-api";

export type CoffeeState = {
    coffeeList?: CoffeeType[];
    controller?: AbortController
    cart?: OrderItem[];
    address?: string;
}

export type CoffeeActions = {
    getCoffeeList: (params?: GetCoffeeListReqParams) => void;
    orderCoffee: () => void;
    addToCart: (item: CoffeeType) => void;
    clearCart: () => void;
    setAddress: (address: string) => void;
}

export type GetCoffeeListReqParams = {
    text?: string;
}

export type OrderItem = {
    id: number,
    name: string,
    size: "L";
    quantity: number;
}

export type OrderCoffeeReq = {
    address: string;
    orderItems: OrderItem[];
}

export type OrderCoffeeRes = {
    message: string;
    success: boolean;
}



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

const partializeState = ({ coffeeList, cart, address }: CoffeeState) => ({ coffeeList, cart, address });

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
    devtools(
        persist(CoffeeSlice, {name: "coffee-store", partialize: partializeState}),
        {name: "coffee-store"}
    )
);

export const getCoffeeList = (params?: GetCoffeeListReqParams) =>
    useCoffeeStore.getState().getCoffeeList(params);
