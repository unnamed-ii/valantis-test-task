import React from 'react';
import {Button} from 'primereact/button';

export const Pagination = ({currentPage, setCurrentPage, isLoading}) => {
    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="app__pagination">
            <Button icon="pi pi-angle-left" onClick={prevPage} disabled={currentPage < 2 || isLoading}
                    className="p-button-secondary"/>
            <b>{currentPage}</b>
            <Button icon="pi pi-angle-right" onClick={nextPage} disabled={isLoading} className="p-button-secondary ml-2"/>
        </div>
    );
};