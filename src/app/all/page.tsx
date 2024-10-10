'use client'

import { fetchEntriesContentful } from '@/lib/bridges'
import { formatPrice } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
      />
    </div>
  );
};

const JsonView = () => {
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [bathroomRange, setBathroomRange] = useState([0, 0]);
  const [bedroomRange, setBedroomRange] = useState([0, 0]);
  const [metersSquareRange, setMetersSquareRange] = useState([0, 0]);

  const [priceValue, setPriceValue] = useState([0, 0]);
  const [bathroomValue, setBathroomValue] = useState([0, 0]);
  const [bedroomValue, setBedroomValue] = useState([0, 0]);
  const [metersSquareValue, setMetersSquareValue] = useState([0, 0]);
  const [selectedBarrios, setSelectedBarrios] = useState<string[]>([]);
  const [barrios, setBarrios] = useState<string[]>([]);
  const [title, setTitle] = useState('');

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const amenitiesOptions = [
    // 'AC', 'Heating', 'Rooftop', 'Furnished', 'Portero', 'Trastero', 'Elevator', 'Parking', 'Balcones'
    'Atico', 'Garaje', 'Balcones', 'Portero'

  ];

  useEffect(() => {
    const fetchData = async () => {
      const { properties, barrios } = await fetchEntriesContentful();


      let maxPrice = 0, minPrice = Infinity;
      let maxBathrooms = 0, minBathrooms = Infinity;
      let maxBedrooms = 0, minBedrooms = Infinity;
      let maxMetersSquare = 0, minMetersSquare = Infinity;

      properties.forEach(property => {
        const { precio, charRef: { banos, dormitorios, metrosCuadradros } } = property;

        if (precio > maxPrice) maxPrice = precio;
        if (precio < minPrice) minPrice = precio;

        if (banos > maxBathrooms) maxBathrooms = banos;
        if (banos < minBathrooms) minBathrooms = banos;

        if (dormitorios > maxBedrooms) maxBedrooms = dormitorios;
        if (dormitorios < minBedrooms) minBedrooms = dormitorios;

        if (metrosCuadradros > maxMetersSquare) maxMetersSquare = metrosCuadradros;
        if (metrosCuadradros < minMetersSquare) minMetersSquare = metrosCuadradros;
      });

      setPriceRange([formatPrice(minPrice), formatPrice(maxPrice)]);
      setBathroomRange([minBathrooms, maxBathrooms]);
      setBedroomRange([minBedrooms, maxBedrooms]);
      setMetersSquareRange([minMetersSquare, maxMetersSquare]);

      setPriceValue([formatPrice(minPrice), formatPrice(maxPrice)]);
      setBathroomValue([minBathrooms, maxBathrooms]);
      setBedroomValue([minBedrooms, maxBedrooms]);
      setMetersSquareValue([minMetersSquare, maxMetersSquare]);

      setBarrios(barrios.map(barrio => barrio.name));
      setSelectedBarrios(barrios.map(barrio => barrio.name));
    };

    fetchData();
  }, []);

  const handleAmenitiesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedAmenities(event.target.value as string[]);
  };

  const handleBarrioChange = (event: React.SyntheticEvent, value: string[]) => {
    setSelectedBarrios(value);
  };



  return (
    <div className='p-4' style={{ width: 365 }}>

      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Buscador Propiedades'
          className='w-full m-2'
        />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Alquilar" labelPlacement='start' />
          <FormControlLabel control={<Switch defaultChecked />} label="Comprar" labelPlacement='start' />
        </FormGroup>
        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Reformado" labelPlacement='start' />
          <FormControlLabel control={<Switch defaultChecked />} label="Sin Reformar" labelPlacement='start' />
        </FormGroup>
      </div>

      <div>
        <RenderView header="Precio" min={priceRange[0]} max={priceRange[1]} value={priceValue} setValue={setPriceValue} />
        <RenderView header="Baños" min={bathroomRange[0]} max={bathroomRange[1]} value={bathroomValue} setValue={setBathroomValue} />
        <RenderView header="Dormitorios" min={bedroomRange[0]} max={bedroomRange[1]} value={bedroomValue} setValue={setBedroomValue} />
        <RenderView header="Metros" min={metersSquareRange[0]} max={metersSquareRange[1]} value={metersSquareValue} setValue={setMetersSquareValue} />
      </div>


      <div className='flex flex-col gap-4 mt-2'>
        <FormControl fullWidth>
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

        <Autocomplete
          multiple
          disableCloseOnSelect
          options={barrios}
          value={selectedBarrios} // Set initial value to selectedBarrios
          filterSelectedOptions
          onChange={handleBarrioChange} // Handle updates to selected values
          renderInput={(params) => (
            <TextField
              {...params}
              label="Barrios"
            />
          )}
        />
      </div>

    </div>
  );
};
const Testing = () => {
  return (
    <JsonView />
  );
};

export default Testing;