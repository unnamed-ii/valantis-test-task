import axios from "axios";
import {generateXAuthHeader} from "../utils";
import {fetchProducts} from "../api";

let retryFetchCount = 0;
export const fetchProductsIDS = async (currentPage, setProducts, setIsLoading) => {
    try {
        setIsLoading(true);
        const response = await axios.post(
            process.env.REACT_APP_API_URL,
            {
                action: "get_ids",
                params: {offset: (currentPage - 1) * 50, limit: 50},
            },
            {
                headers: {
                    "X-Auth": generateXAuthHeader(),
                },
            }
        );
        const ids = response.data.result;
        const productsData = await fetchProducts(ids);

        // handle duplicates by id
        const uniqueProducts = Array.from(
            new Set(productsData?.map((product) => product.id))
        )?.map(
            (id) => productsData.find((product) => product.id === id)
        );
        setProducts(uniqueProducts);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
            console.error('HTTP Error:', error.response?.status);
            console.log("RETRYING REQUEST");
            if (retryFetchCount < 5) {
                retryFetchCount++;
                setTimeout(await void fetchProductsIDS(
                    currentPage,
                    setProducts,
                    setIsLoading
                ), 1000);
            } else {
                console.error("Retried to call server max times (5)");
            }
        } else {
            console.error('Error fetching data:', error);
        }
    }
};