import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Skeleton} from "primereact/skeleton";
import React from "react";

const ITEMS = [{},{},{},{},{},{},{},{},{},{}];

export const TableSkeleton = () => {
    return (
        <div className="card">
            <DataTable value={ITEMS} className="p-datatable-striped" tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID" style={{ width: '35%' }} body={<Skeleton />}></Column>
                <Column field="name" header="Название" style={{ width: '45%' }} body={<Skeleton />}></Column>
                <Column field="price" header="Цена" style={{ width: '10%' }} body={<Skeleton />}></Column>
                <Column field="brand" header="Бренд" style={{ width: '10%' }} body={<Skeleton />}></Column>
            </DataTable>
        </div>
    )
}