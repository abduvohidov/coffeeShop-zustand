import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const useUrlStorage = <T extends Record<string, string>>(
    params: T,
    setParams: (params: T) => void
) => {
    const [queryParams, setQueryParams] = useSearchParams();

    const setParamsFromUrl = () => {
        const paramsFromUrl = Object.keys(params).reduce((acc, key) => {
            const value = queryParams.get(key);
            if (value) {
                acc[key as keyof T] = value as T[keyof T];
            }
            return acc;
        }, {} as Partial<T>);

        if (Object.keys(paramsFromUrl).length > 0) {
            setParams(paramsFromUrl as T);
        }
    };

    useEffect(() => {
        setParamsFromUrl();
    }, [queryParams]);

    useEffect(() => {
        const newQueryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                newQueryParams.set(key, value);
            }
        });
        setQueryParams(newQueryParams);
    }, [params, setQueryParams]);
};
