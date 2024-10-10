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

import { SearchBar } from '@/components/SearchBar';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



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
    <SearchBar/>
  );
};

const Testing = () => {
  return (
    <JsonView />
  );
};

export default Testing;