interface ApiConfig {
    url: (endpoint: string) => string;
}

interface Config {
    name: string
    api: ApiConfig;
}

export const appConfig: Config = {
    name: 'Conversation App',
    api: {
        /**
         * Constructs a full API URL by combining the base URL with the provided endpoint.
         * It ensures there are no repeated slashes between the base URL and the endpoint.
         *
         * @param {string} endpoint - The API endpoint to append to the base URL.
         * @returns {string} - The full URL constructed by combining the base URL and the endpoint.
         */
        url: (endpoint: string): string => {
            const apiUrl = 'http://127.0.0.1:8000/';
            return `${apiUrl.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
        }
    }
};

type CallbackFunction = (payload: any) => void;

const subscribers: Record<string, CallbackFunction[]> = {};

export const publish = (action: string, payload: any) => {
    if (subscribers[action]) {
        subscribers[action].forEach(callback => callback(payload));
    }
};

export const subscribe = (action: string, callback: CallbackFunction) => {
    if (!subscribers[action]) {
        subscribers[action] = [];
    }
    subscribers[action].push(callback);

    // Return an unsubscribe function
    return () => {
        subscribers[action] = subscribers[action].filter(cb => cb !== callback);
    };
};

export const themeOption = 'dark'