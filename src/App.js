import React, {useEffect, useState} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import {TableSkeleton} from "./components/table/TableSkeleton";
import {Table} from "./components/table";
import {Pagination} from "./components/pagination";
import {fetchProductsIDS} from "./api";
import {FilterSelect} from "./components/filters";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isRequestFiltered, setIsRequestFiltered] = useState(false);
    useEffect(() => {
        void fetchProductsIDS(currentPage, setProducts, setIsLoading);
    }, [currentPage]);

    return (
        <div className="wrapper">
            <div className="app">
                <FilterSelect
                    isLoading={isLoading}
                    setProducts={setProducts}
                    setIsLoading={setIsLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setIsRequestFiltered={setIsRequestFiltered}
                />
                {isLoading
                    ?
                    <TableSkeleton/>
                    :
                    <Table products={products}/>
                }
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLoading={isLoading}
                    isRequestFiltered={isRequestFiltered}
                />
            </div>
        </div>
    );
}

export default App;
