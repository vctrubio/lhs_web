'use client'
import React, { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useSharedQueryState } from '@/lib/nuqs';
import { IconPlano, IconPrice, IconBath, IconBed, IconMeasure, IconSearch, IconLocation } from '@/lib/svgs'; // Ensure these are imported correctly
import { Section, ButtonBottom } from '@/components/SideBarContentProperty';

export const SearchBar = () => {
  const {
    priceRange, priceValue, setPriceValue,
    bathroomRange, bathroomValue, setBathroomValue,
    bedroomRange, bedroomValue, setBedroomValue,
    metersSquareRange, metersSquareValue, setMetersSquareValue,
    selectedBarrios, setSelectedBarrios,
    barrios, selectedAmenities, setSelectedAmenities, amenitiesOptions,
    setFlagReformado, setFlagSinReformar,
    title, setTitle,
    handleReset
  } = useSharedQueryState();

  useEffect(() => {
    setSelectedBarrios(barrios);
  }, [barrios]);


  const handleAmenitiesChange = (event: any) => {
    setSelectedAmenities(event.target.value);
  };

  const handleBarrioChange = (event: any, value: any) => {
    setSelectedBarrios(value);
  };

  const handleReformadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlagReformado(event.target.checked ? '' : 'no');
  };

  const handleSinReformarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlagSinReformar(event.target.checked ? '' : 'no');
  };

  const disabledFlag = false;
  return (
    <>
      <Section
        title={title} // Bind the title from shared state
        icon={<IconSearch />}
        disabled={disabledFlag}
        onChange={(e) => setTitle(e.target.value)} // Update title on change
      />

      <Section
        title="Precio"
        icon={<IconPrice />}
        disabled={disabledFlag}
        slider={{
          min: priceRange[0],
          max: priceRange[1],
          value: priceValue,
          setValue: setPriceValue,
        }}
      />

      <Section
        title="Dormitorios"
        icon={<IconBed />}
        disabled={disabledFlag}
        slider={{
          min: bedroomRange[0],
          max: bedroomRange[1],
          value: bedroomValue,
          setValue: setBedroomValue,
        }}
      />
      <Section
        title="Baños"
        icon={<IconBath />}
        disabled={disabledFlag}
        slider={{
          min: bathroomRange[0],
          max: bathroomRange[1],
          value: bathroomValue,
          setValue: setBathroomValue,
        }}
      />
      <Section
        title="Metros"
        icon={<IconMeasure />}
        disabled={disabledFlag}
        slider={{
          min: metersSquareRange[0],
          max: metersSquareRange[1],
          value: metersSquareValue,
          setValue: setMetersSquareValue,
        }}
      />

      <ButtonBottom lettering='Reset Filters' action={handleReset} />

    </>
  );
}




/*
      <div className='flex flex-col gap-4 mt-2'>
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={barrios}
          value={selectedBarrios}
          filterSelectedOptions
          onChange={handleBarrioChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Barrios"
            />
          )}
        />
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