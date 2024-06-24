import { useEffect, useState } from 'react';
import { RequestResponseType } from '../types';
import { subscribe } from '../utils/helpers';

type Props = {
    componentId: string;
};

const useAutoPostDone = ({ componentId }: Props) => {
    const [response, setResponse] = useState<RequestResponseType>();

    useEffect(() => {
        // Factory function to generate subscription handlers based on componentId
        const subscribeToDoneEvent = (eventName: string) => {
            const handleResponse = (response: RequestResponseType) => {
                setResponse(response);
            };

            return subscribe(eventName, handleResponse);
        };

        // List of event names to subscribe to
        const eventNames = [
            `${componentId}_done`,
            `${componentId}CreateOrUpdate_done`,
            `${componentId}UpdateStatus_done`,
            `${componentId}Archive_done`,
            `${componentId}Delete_done`,
        ];

        // Subscribe to all specified events
        const unsubscribeFunctions = eventNames.map((eventName) =>
            subscribeToDoneEvent(eventName)
        );

        // Clean up subscriptions
        return () => {
            unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
        };
    }, [componentId]);

    return { response };
};

export default useAutoPostDone;
