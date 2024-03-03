import React, {useRef, useState} from "react";
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {fetchFilteredProducts, fetchProductsIDS} from "../../api";

const FILTERS = [
    {name: "Название", fetchingParamName: "product"},
    {name: 'Цена', fetchingParamName: "price"},
    {name: 'Бренд', fetchingParamName: "brand"},
];

export const FilterSelect = ({isLoading, setProducts, setIsLoading, currentPage, setCurrentPage, setIsRequestFiltered}) => {
    const [activeFilter, setActiveFilter] = useState(null);
    const [searchInputType, setSearchInputType] = useState("text");
    const [searchInputValue, setSearchInputValue] = useState("");
    const dropDownRef = useRef(null);
    const onSelectChange = (value) => {
        setActiveFilter(value);
        setSearchInputType(value.fetchingParamName === "price" ? "number" : "text");
    }

    const removeFilters = async () => {
        setCurrentPage(1);
        setActiveFilter(null);
        setIsRequestFiltered(false);
        setSearchInputValue("");
        await fetchProductsIDS(
            currentPage,
            setProducts,
            setIsLoading
        );
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setIsRequestFiltered(true);
        await fetchFilteredProducts(
            activeFilter.fetchingParamName,
            searchInputValue,
            setProducts,
            setIsLoading
        );
    }

    const onClick = () => {
        if (activeFilter === null) {
            dropDownRef?.current?.focus();
        }
    }

    return (
        <div className="filter-select">
            <form onSubmit={handleFormSubmit}>
                <div className="filter-select__input">
                    <span className="p-input-icon-left" onClick={onClick}>
                        {isLoading
                            ?
                            <i className="pi pi-spin pi-spinner"/>
                            :
                            <i className="pi pi-search"/>
                        }
                        <InputText
                            placeholder="Введите текст"
                            disabled={activeFilter === null}
                            type={searchInputType}
                            value={searchInputValue}
                            onChange={(e) => setSearchInputValue(e.target.value)}
                        />
                    </span>
                </div>
                <Dropdown
                    ref={dropDownRef}
                    value={activeFilter}
                    onChange={(e) => onSelectChange(e.target.value)}
                    options={FILTERS}
                    optionLabel="name"
                    placeholder="Выберите фильтр"
                    className="w-full md:w-14rem"
                />
                <Button type="submit" label="Фильтровать" disabled={searchInputValue === ""}/>
            </form>
            <div className="filter-select__button-wrapper">
                <Button
                    label="Получить без фильтра"
                    severity="secondary"
                    onClick={removeFilters}
                    disabled={activeFilter === null}
                />
            </div>
        </div>
    )
}