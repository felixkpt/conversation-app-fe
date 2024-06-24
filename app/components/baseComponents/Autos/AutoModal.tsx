'use client'
import { useEffect, useRef, useState } from "react";
import { subscribe } from "../utils/helpers";
import { RequestResponseType } from "../types";

type Props = {
    componentId: string;
    title?: string;
    children: React.ReactNode;
};

const AutoModal = ({ componentId, title, children }: Props) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const handleShowModal = () => {
            if (modalRef.current) {
                modalRef.current.showModal();
            }
        };

        const unsubscribeShowModal = subscribe(`${componentId}_showModal`, handleShowModal);

        return () => {
            unsubscribeShowModal();
        };
    }, [componentId]);

    useEffect(() => {
        const handleResponse = ({ status }: RequestResponseType) => {
            if (status === 200) {
                closeModal();
            }
        };

        const unsubscribe = subscribe(`${componentId}_done`, handleResponse);

        return () => {
            unsubscribe();
        };
    }, [componentId]);

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    return (
        <div>
            <dialog ref={modalRef} id={`${componentId}Modal`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                    </form>
                    <div className='my-3'>{children}</div>
                </div>
            </dialog>
        </div>
    );
};

export default AutoModal;
