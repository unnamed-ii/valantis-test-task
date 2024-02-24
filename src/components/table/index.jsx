import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

export const Table = ({products}) => {
    return (
        <DataTable value={products} tableStyle={{minWidth: "50rem", height: "70vh"}}>
            <Column field="id" header="ID"/>
            <Column field="product" header="Название"/>
            <Column field="price" header="Цена"/>
            <Column field="brand" header="Бренд"/>
        </DataTable>
    );
};