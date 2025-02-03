import React from 'react';
import { useSelector } from 'react-redux';

import { getEntities } from '@modules/Entity/reducers/entities';

// route manager hook
export const useEntityRoutes = () => {
    const entities = useSelector(getEntities);

    return entities?.routes || [];
}