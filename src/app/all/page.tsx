'use client'

import React, { useState, useEffect } from 'react';

import { SearchBar } from '@/components/SearchBar';
import { fetchEntriesContentful } from '@/lib/bridges';


const JsonView =  () => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  
  useEffect(() => {
    const ptrFetch = async () => {
      const { properties } = await fetchEntriesContentful();
      if (properties && properties.length > 0) {
        const titles = properties.map(property => property.title);
        setSelectedProperties(titles);
      }
    };
    ptrFetch();
  }, []);

  return (
    <>
      <SearchBar />
      <div>
        {selectedProperties.map((property, index) => (
          <div key={index}>
            {property}
          </div>
        ))}
      </div>
    </>
  );
};

const Testing = () => {
  return (
    <JsonView />
  );
};

export default Testing;