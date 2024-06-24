import { ErrorResponse } from "react-router-dom";

export type RequestResponseType = {
    status: number;
    data?: any;
    error?: ErrorResponse;
};

export type HttpVerb = 'GET' | 'get' | 'POST' | 'post' | 'PUT' | 'put' | 'PATCH' | 'patch' | 'DELETE' | 'delete' | 'HEAD' | 'head' | 'OPTIONS' | 'options' | 'CONNECT' | 'connect' | 'TRACE' | 'trace';
