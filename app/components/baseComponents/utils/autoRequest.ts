import axios, { AxiosError } from 'axios';
import { appConfig } from './helpers';
import { publish } from './helpers';

export type AutoResponseType<T> = {
    status: number;
    data?: T;
    error?: any;
};

export async function autoRequest<T>(
    action: string,
    method: string,
    formData?: any
): Promise<AutoResponseType<T>> {
    try {
        const url = appConfig.api.url(action);
        const response = await axios({
            method,
            url,
            data: formData,
        });

        // Publish autoRequestDone event with response
        publish('autoRequestDone', {
            status: response.status,
            data: response.data,
            error: undefined, // No error if we reach here
        });

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const errorData = axiosError.response?.data || axiosError?.message;

            // Publish autoRequestDone event with error details
            publish('autoRequestDone', {
                status: axiosError.response?.status || 500,
                data: undefined, // No data if there's an error
                error: errorData,
            });

            return {
                status: axiosError.response?.status || 500,
                error: errorData,
            };
        } else {
            const internalError = (error as Error).message || 'Internal Server Error';

            // Publish autoRequestDone event with internal error
            publish('autoRequestDone', {
                status: 500,
                data: undefined, // No data if there's an error
                error: internalError,
            });

            return {
                status: 500,
                error: internalError,
            };
        }
    }
}
