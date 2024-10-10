'use client'

import React, { useState, useEffect } from 'react';

import { SearchBar } from '@/components/SearchBar';
import { fetchEntriesContentful } from '@/lib/bridges';
import { Logo } from '@/components/Sidebar';
import { Section, Content } from '@/components/PropertyDesc';

const FormatAll = () => {


  return (
    <div className='test-bar'>
      <Logo />
      <Content />
      <div>foot</div>
    </div>
  )
}


const JsonView = () => {
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
    <div >
      <FormatAll />
    </div>
  );

};

const Testing = () => {
  return (
    <JsonView />
  );
};

export default Testing;