import React from 'react';
import { useSecureRoute } from '@app/hooks/route';

// route manager hook
export const useEntityRoutes = () => {
    const api = useSecureRoute();
    const [routes, setRoutes] = React.useState([]);

    React.useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await api.get('/entity');
                setRoutes(response.data?.routes);
            } catch (error) {
                console.error('Failed to fetch routes:', error);
            }
        };
        fetchRoutes();
    }, []);

    return routes;
}