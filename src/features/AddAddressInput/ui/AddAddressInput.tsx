import {TextInput} from "@gravity-ui/uikit";
import {useCoffeeStore} from "../../../entities/Coffee/model/store.ts";
import {FC} from "react";

type AddAddressInputProps = {
    className?: string;
}

export const AddAddressInput: FC<AddAddressInputProps> = ({className}) => {
    const address = useCoffeeStore(state => state.address);
    const useSetAddress = useCoffeeStore(state => state.setAddress);
    return (
        <TextInput
            size={"xl"}
            placeholder="Адрес"
            onUpdate={useSetAddress}
            value={address}
            className={className}
        />

)
}
