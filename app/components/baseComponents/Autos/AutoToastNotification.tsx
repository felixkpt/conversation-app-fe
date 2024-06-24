'use client'
import React, { useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscribe } from '../utils/helpers';
import { AutoResponseType } from '../utils/autoRequest';

const AutoToastNotification: React.FC = () => {
    useEffect(() => {
        const unsubscribe = subscribe('autoRequestDone', handleNotification);

        return () => {
            unsubscribe();
        };
    }, []);

    const handleNotification = useCallback((event: CustomEvent) => {

       setTimeout(() => {
        if (isDialogOpen()) {
            return; // Don't show toast if a dialog is open
        }

        const response = event as unknown as AutoResponseType<any>
        const { status, data, error } = response;

        const errorMessage = error?.message || error?.detail

        if (status === 200) {
            toast.success(data?.message || 'Operation successful');
        } else if (status >= 400 && status < 500) {
            toast.warning(errorMessage || 'Client error');
        } else if (status >= 500) {
            toast.error(errorMessage || 'Server error');
        } else {
            toast.info('Info notification');
        }
       }, 300);
    }, []);

    const isDialogOpen = () => {
        const dialogs = document.querySelectorAll('dialog');
        let isOpen = false;
    
        dialogs.forEach((dialog) => {
            if (dialog.open) {
                isOpen = true;
                return; // Exit forEach early if a dialog is found open
            }
        });
    
        return isOpen;
    };    

    return (
        <div>
            <ToastContainer
                position="top-right"
                theme='light'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default AutoToastNotification;
