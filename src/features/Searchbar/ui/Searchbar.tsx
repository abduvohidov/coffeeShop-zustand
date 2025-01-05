import {TextInput} from "@gravity-ui/uikit";
import {useCoffeeStore} from "../../../entities/Coffee/model/store.ts";
import {FC} from "react";

type Searchbar = {
    className?: string;
}

export const Searchbar: FC<Searchbar> = ({className}) => {
    const params = useCoffeeStore(state => state.params);
    const useSetParams = useCoffeeStore(state => state.setParams);

    return (
        <TextInput
            size="xl"
            placeholder="Поиск..."
            value={params.text}
            className={className}
            onChange={(e) => {
                useSetParams({text: e.target.value})
            }}
        />
    )
}
