import {StateCreator} from "zustand";
import axios from "axios";
import {Actions, ListActions, ListState, Middleware, States} from "../../types.ts";
import {BASE_URL} from "../../../shared/api";

export const listSlice: StateCreator<States & Actions, Middleware, Middleware, ListActions & ListState> = (set, get) => ({
    coffeeList: undefined,
    params: {text: undefined},
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
        }
    },
    setParams: (newParams) => {
        const {getCoffeeList, params} = get();
        set({params: {...params, ...newParams}}, false, "setParams");
        getCoffeeList(params);
    }
})
