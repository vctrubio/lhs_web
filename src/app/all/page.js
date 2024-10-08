import React from 'react';
import { fetchEntriesContentful} from '@/lib/bridges'

const JsonView = async () => {
    const { properties } = await fetchEntriesContentful();

    return (
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(properties, null, 2)}
        </pre>
    );
};


const Testing = () => {
    return (
            <JsonView />
    );
};

export default Testing;