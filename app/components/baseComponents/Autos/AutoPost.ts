// components/AutoPost.tsx

import React, { useEffect } from 'react';
import { subscribe, publish } from '../utils/helpers';
import { AutoResponseType, autoRequest } from '../utils/autoRequest';

type Props = {
    componentId: string;
};

const AutoPost: React.FC<Props> = ({ componentId }) => {

    useEffect(() => {
        const handleSubmit = async ({ action, method, formData }: any) => {
            try {
                const response: AutoResponseType<any> = await autoRequest(action, method, formData);

                publish(`${componentId}_done`, {
                    status: response.status,
                    data: response.data,
                    error: response.error,
                });
            } catch (error) {
                const errorMessage = (error as Error).message || 'Internal Server Error';

                publish(`${componentId}_done`, {
                    status: 500,
                    error: errorMessage,
                });
            }
        };

        const unsubscribe = subscribe(`${componentId}_submit`, handleSubmit);

        return () => {
            unsubscribe();
        };
    }, [componentId]);

    return null;
};

export default AutoPost;
