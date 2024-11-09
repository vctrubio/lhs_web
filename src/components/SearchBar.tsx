'use client'
import React from 'react';

import { useSharedQueryState } from '@/lib/nuqs';

import { SideBarPropComponent } from '@/types/glasses';

export const SearchBar = () => {
  const {
    priceRange, priceValue, setPriceValue,
    bathroomRange, bathroomValue, setBathroomValue,
    bedroomRange, bedroomValue, setBedroomValue,
    metersSquareRange, metersSquareValue, setMetersSquareValue, title,
    setTitle, barrios, selectedBarrios, setSelectedBarrios,
    handleReset,
    hasQueryParams, // Get hasQueryParams from shared state
    sortOption, setSortOption,
  } = useSharedQueryState();

  const filterSections = [
    {
      component: new SideBarPropComponent({
        title: title,
        disabled: false,
        onChange: (e) => setTitle(e.target.value),
        markValue: null,
        barrio: null,
        componentKey: 'search',
        hasQueryParams, // Pass the flag here
        onReset: handleReset,
        sortOption,
        setSortOption,
        searchKey: true,
      })
    },
    {
      component: new SideBarPropComponent({
        title: "Precio",
        slider: {
          min: priceRange[0],
          max: priceRange[1],
          value: priceValue,
          setValue: setPriceValue,
          step: 0.1,
        },
        disabled: false,
        markValue: null,
        barrio: null,
        onChange: () => { },
        componentKey: 'price',
        hasQueryParams, // Add hasQueryParams
        sortOption, // Pass sortOption
        setSortOption, // Pass setSortOption
        searchKey: true,
      })
    },
    {
      component: new SideBarPropComponent({
        title: "Dormitorios",
        slider: {
          min: bedroomRange[0],
          max: bedroomRange[1],
          value: bedroomValue,
          setValue: setBedroomValue,
          step: 1,
        },
        disabled: false,
        markValue: null,
        barrio: null,
        onChange: () => { },
        componentKey: 'bedrooms',
        hasQueryParams, // Add hasQueryParams
        sortOption, // Pass sortOption
        setSortOption, // Pass setSortOption
        searchKey: true,
      })
    },
    {
      component: new SideBarPropComponent({
        title: "Baños",
        slider: {
          min: bathroomRange[0],
          max: bathroomRange[1],
          value: bathroomValue,
          setValue: setBathroomValue,
          step: 1,
        },
        disabled: false,
        markValue: null,
        barrio: null,
        onChange: () => { },
        componentKey: 'bathrooms',
        hasQueryParams, // Add hasQueryParams
        sortOption, // Pass sortOption
        setSortOption, // Pass setSortOption
        searchKey: true,
      })
    },
    {
      component: new SideBarPropComponent({
        title: "Metros",
        slider: {
          min: metersSquareRange[0],
          max: metersSquareRange[1],
          value: metersSquareValue,
          setValue: setMetersSquareValue,
          step: 1,
        },
        disabled: false,
        markValue: null,
        barrio: null,
        onChange: () => { },
        componentKey: 'meters',
        hasQueryParams, // Add hasQueryParams
        sortOption, // Pass sortOption
        setSortOption, // Pass setSortOption
        searchKey: true,
      })
    },
    {
      component: new SideBarPropComponent({
        title: "Barrio",
        barrio: {
          barrios: barrios,
          selectedBarrios: selectedBarrios,
          setSelectedBarrios: setSelectedBarrios,
        },
        disabled: false,
        markValue: null,
        slider: null,
        onChange: () => { },
        componentKey: 'neighborhood',
        hasQueryParams, // Add hasQueryParams
        sortOption, // Pass sortOption
        setSortOption, // Pass setSortOption
      })
    },
  ];

  return (
    <>
      {filterSections.map((section) => (
        <React.Fragment key={section.component.props.componentKey}>
          {section.component.render()}
        </React.Fragment>
      ))}
    </>
  );
};
