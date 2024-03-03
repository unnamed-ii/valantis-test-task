import React from 'react';
import {Button} from 'primereact/button';

export const Pagination = ({currentPage, setCurrentPage, isLoading, isRequestFiltered}) => {
    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="app__pagination">
            {isRequestFiltered
                ?
                <div className="app__pagination-message">
                    <span>
                        *Возможность постраничного перехода выключена из-за фильтрованного запроса
                    </span>
                </div>
                : null
            }
            <div className="app__pagination-buttons">
                <Button icon="pi pi-angle-left" onClick={prevPage} disabled={currentPage < 2 || isLoading || isRequestFiltered}
                        className="p-button-secondary"/>
                <b>{currentPage}</b>
                <Button icon="pi pi-angle-right" onClick={nextPage} disabled={isLoading || isRequestFiltered} className="p-button-secondary ml-2"/>
            </div>
        </div>
    );
};