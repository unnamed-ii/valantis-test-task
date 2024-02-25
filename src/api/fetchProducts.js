import axios from "axios";
import {generateXAuthHeader} from "../utils";

let retryFetchCount = 0;

export const fetchProducts = async (ids) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_API_URL,
            {
                action: "get_items",
                params: {ids},
            },
            {
                headers: {
                    "X-Auth": generateXAuthHeader(),
                },
            }
        );
        return response.data.result || [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('HTTP Error:', error.response?.status);
            console.log("RETRYING REQUEST");
            if (retryFetchCount < 5) {
                retryFetchCount++;
                await fetchProducts(ids);
            } else {
                console.error("Retried to call server max times (5)");
            }
        } else {
            console.error('Error fetching data:', error);
        }
    }
};