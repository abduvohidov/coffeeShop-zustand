import {CoffeeModel} from "./Coffee";

export type GetCoffeeListReqParams = {
    text?: string;
}

export type OrderItem = {
    id: number,
    name: string,
    size: "L";
    quantity: number;
}

export type OrderCoffeeRes = {
    message: string;
    success: boolean;
}

export type ListState = {
    coffeeList?: CoffeeModel[];
    controller?: AbortController;
    params: GetCoffeeListReqParams;
}
export type ListActions = {
    getCoffeeList: (params?: GetCoffeeListReqParams) => void;
    setParams: (params?: GetCoffeeListReqParams) => void;
}
export type CartState = {
    cart?: OrderItem[];
    address?: string;
}
export type CartActions = {
    setAddress: (address: string) => void;
    addToCart: (item: CoffeeModel) => void;
    orderCoffee: () => void;
    clearCart: () => void;
}

export type States = CartState & ListState
export type Actions = CartActions & ListActions
export type Middleware = [["zustand/devtools", never], ["zustand/persist", unknown]]
