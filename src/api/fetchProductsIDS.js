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

        // when we got error in fetchProduct function, we recall it,
        // but at that time we already wrote value in productsData variable which is undefined,
        // so now we need to recall fetchProductsIDS to rewrite value productsData
        if (!productsData) {
            console.log("RETRYING REQUEST");
            await fetchProductsIDS(currentPage, setProducts, setIsLoading);
            return;
        }

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
                await void fetchProductsIDS(
                    currentPage,
                    setProducts,
                    setIsLoading
                );
            } else {
                console.error("Retried to call server max times (5)");
            }
        } else {
            console.error('Error fetching data:', error);
        }
    }
};