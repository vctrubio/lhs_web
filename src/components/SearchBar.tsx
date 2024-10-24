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
    hasQueryParams,
    sortOption, setSortOption, // Add sortOption and setSortOption
    properties, // Get the sorted properties
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
        onReset: handleReset, // Pass the handleReset function
        sortOption, // Pass sortOption
        setSortOption, // Pass setSortOption
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
      })
    },
  ];

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value); // This will update the URL
  };

  return (
    <>
      {filterSections.map((section) => (
        <React.Fragment key={section.component.props.componentKey}>
          {section.component.render()}
        </React.Fragment>
      ))}
      <div className="sort-component">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="bedroomsAsc">Bedrooms: Low to High</option>
          <option value="bedroomsDesc">Bedrooms: High to Low</option>
          <option value="bathroomsAsc">Bathrooms: Low to High</option>
          <option value="bathroomsDesc">Bathrooms: High to Low</option>
        </select>
      </div>
    </>
  );
};

/*

 <div className="sort-component">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="bedroomsAsc">Bedrooms: Low to High</option>
          <option value="bedroomsDesc">Bedrooms: High to Low</option>
          </select>
          </div>
          <div className="property-list">
            {properties.map(property => (
              <div key={property.id}>
                <h3>{property.title}</h3>
                <p>Price: {property.precio}</p>
                <p>Bedrooms: {property.charRef.dormitorios}</p>
              </div>
          </div>
  <div style={{ display: 'flex', gap: '5px' }}>
        <FormControlLabel
          control={<Switch defaultChecked onChange={handleReformadoChange} />}
          label="Reformado"
          labelPlacement='start'
        />
        <FormControlLabel
          control={<Switch defaultChecked onChange={handleSinReformarChange} />}
          label="Sin Reformar"
          labelPlacement='start'
        />
      </div> 


     {/* <FormControl fullWidth>
          <InputLabel id="amenities-select-label"
            shrink={false}
            style={{
              display: selectedAmenities.length > 0 ? 'none' : 'block',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              transition: 'top 0.3s, transform 0.3s',
              padding: '0 4px',
            }}>Tiene que tener...</InputLabel>
          <Select
            labelId="amenities-select-label"
            id="amenities-select"
            multiple
            value={selectedAmenities}
            onChange={handleAmenitiesChange}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {amenitiesOptions.map((amenity) => (
              <MenuItem key={amenity} value={amenity}>
                <Checkbox checked={selectedAmenities.indexOf(amenity) > -1} />
                <ListItemText primary={amenity} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> 

*/


