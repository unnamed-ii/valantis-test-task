import axios from "axios";
import {generateXAuthHeader} from "../utils";
import {fetchProducts} from "./fetchProducts";

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
        setProducts(productsData);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error("Error while filtering products:", error);
    }
}