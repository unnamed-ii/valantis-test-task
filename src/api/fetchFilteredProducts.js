import axios from "axios";
import {generateXAuthHeader} from "../utils";
import {fetchProducts} from "./fetchProducts";

let retryFetchCount = 0;

export const fetchFilteredProducts = async (filterName, filterValue, setProducts, setIsLoading) => {
    if (!filterValue) return null;
    if (filterName === "price") {
        filterValue = parseFloat(filterValue);
    } else {
        filterValue = filterValue.trim();
    }
    try {
        setIsLoading(true);
        const response = await axios.post(
            process.env.REACT_APP_API_URL,
            {
                action: "filter",
                params: {
                    [filterName]: filterValue
                }
            }, {
                headers: {
                    "X-Auth": generateXAuthHeader(),
                },
            }
        );
        const ids = response.data.result;
        const productsData = await fetchProducts(ids);

        if (!productsData) {
            console.log("RETRYING REQUEST");
            await fetchFilteredProducts(filterName, filterValue, setProducts, setIsLoading)
            return;
        }

        setProducts(productsData);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
            console.error('HTTP Error:', error.response?.status);
            console.log("RETRYING REQUEST");
            if (retryFetchCount < 5) {
                retryFetchCount++;
                await fetchFilteredProducts(
                    filterName,
                    filterValue,
                    setProducts,
                    setIsLoading
                );
            } else {
                console.error("Retried to call server max times (5)");
            }
        } else {
            console.error("Error while filtering products:", error);
        }
    }
}