import { StateCreator, create } from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {getCoffeeList} from "../../Coffee";
import {hashStorage} from "../../../shared/configs/hashStorage";

type SearchState = {
    text?: string;
}

type SearchActions = {
    setText: (text: string) => void;
}

type SearchStore = SearchState & SearchActions;
type SearchStoreCreator = StateCreator<SearchStore, [["zustand/devtools", never], ["zustand/persist", unknown]]>;

const searchSlice: SearchStoreCreator = (set) => ({
    text: undefined,
    setText: (text: string) => set({text}, false, "setText")
})

export const useSearchStore = create<SearchStore>()(
    devtools(
        persist(searchSlice, {name: "search-store", storage: createJSONStorage(() => hashStorage)}),
        {name: "search-store"}
    )
);

useSearchStore.subscribe((state, prevState) => {
    if(state.text !== prevState.text) {
        getCoffeeList({text: state.text});
    }
})
