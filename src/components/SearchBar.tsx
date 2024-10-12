'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort, faNoteSticky, faFile, faBook } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect, use } from 'react';
import Slider from '@mui/material/Slider';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSharedQueryState } from '@/lib/queries';

interface RenderViewProps {
  header: string;
  min: number;
  max: number;
  value: number[];
  setValue: (value: number[]) => void;
}

const RenderView: React.FC<RenderViewProps> = ({ header, min, max, value, setValue }) => {
  let step = 1;

  if (header === 'Precio') {
    step = 0.1;
  }

  const marks = [
    { value: min, label: header === 'Precio' ? `${min}M €` : min.toString() },
    { value: max, label: header === 'Precio' ? `${max}M €` : max.toString() },
    ...(value[0] !== min && value[0] !== max ? [{ value: value[0], label: header === 'Precio' ? `${value[0]}M €` : value[0].toString() }] : []),
    ...(value[1] !== min && value[1] !== max ? [{ value: value[1], label: header === 'Precio' ? `${value[1]}M €` : value[1].toString() }] : [])
  ];

  return (
    <div className='flex flex-col gap-1 px-4'>
      <h3>{header}</h3>
      <Slider
        value={value}
        onChange={(e, newValue) => setValue(newValue as number[])}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disableSwap
        valueLabelDisplay="auto"
        style={{ color: 'var(--color-green-dark)' }}
      // style={{border: '1px solid black '}}
      />
    </div>
  );
};



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

  return (
    <div className="search-bar">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type='text'
        placeholder='Propiedades'
        className='w-full mb-4'
      />

      {/* <div style={{ display: 'flex', gap: '5px' }}>
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
      </div> */}

      <div>
        <RenderView header="Precio" min={priceRange[0]} max={priceRange[1]} value={priceValue} setValue={setPriceValue} />
        <RenderView header="Baños" min={bathroomRange[0]} max={bathroomRange[1]} value={bathroomValue} setValue={setBathroomValue} />
        <RenderView header="Dormitorios" min={bedroomRange[0]} max={bedroomRange[1]} value={bedroomValue} setValue={setBedroomValue} />
        <RenderView header="Metros" min={metersSquareRange[0]} max={metersSquareRange[1]} value={metersSquareValue} setValue={setMetersSquareValue} />
      </div>


      <div className='flex flex-col gap-4 mt-2'>
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
        </FormControl> */}

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


      <div>
        <button onClick={handleReset} className="border border-white rounded-2xl">Reset Filters</button>
      </div>
    </div>
  );
}