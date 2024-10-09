import React from 'react';
import { fetchEntriesContentful } from '@/lib/bridges'
import { Property } from '@/types/property';
import { SNF } from '@/components/SearchFilter'
import { SearchProperties } from '@/components/sidebar';

const HomePage = async () => {
    const { properties }: { properties: Property[] } = await fetchEntriesContentful();

    return (
        <SNF entries={properties} />
    )
}

export default HomePage;