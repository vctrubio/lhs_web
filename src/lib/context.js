'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchEntriesContentful } from './bridges'; // Adjust this path accordingly

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [listings, setListings] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const { properties, barrios, listings } = await fetchEntriesContentful();
        setProperties(properties);
        setBarrios(barrios);
        setListings(listings);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, barrios, loading, listings, error }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
