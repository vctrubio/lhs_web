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
  } = useSharedQueryState();


  const filterSections = [
    {
      key: 'search',
      component: new SideBarPropComponent({
        title: title,
        disabled: false,
        onChange: (e) => setTitle(e.target.value),
        markValue: null,
        barrio: null,
        //icon triger = handlreset
      })
    },
    {
      key: 'price',
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
      })
    },
    {
      key: 'bedrooms',
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
      })
    },
    {
      key: 'bathrooms',
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
      })
    },
    {
      key: 'meters',
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
      })
    },
    {
      key: 'neighborhood',
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
      })
    },
  ];

  return (
    <>
      {filterSections.map((section) => (
        <React.Fragment key={section.key}>
          {section.component.render()}
        </React.Fragment>
      ))}
      <button onClick={handleReset} className="border border-white rounded-2xl">Reset Filters</button>
    </>
  );
};

/*
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


