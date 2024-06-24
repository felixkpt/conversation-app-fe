'use client'
import { useEffect, useState } from 'react';
import { subscribe } from '../../utils/helpers';
import { HttpVerb } from '@/app/components/baseComponents/types';
import { FillableType } from '../BaseAutoModel/types';


type ErrorResponse = {
    detail: { loc: string[]; msg: string; type: string }[];
};

type Props = {
    componentId: string;
    modelName: string;
    method: HttpVerb;
    endpoint: string; // Change action to endpoint
    fillable: FillableType[];
};

const AutoDeleteRecord: React.FC<Props> = ({ componentId, modelName, method, endpoint, fillable }) => {
    const [localTitle, setLocalTitle] = useState(`${modelName} record`)
    const [record, setRecord] = useState<any>();

    useEffect(() => {
        if (record) {
            setLocalTitle(`${modelName} record #${record.id}`)
        } else {
            setLocalTitle(`${modelName} record`)
        }
    }, [record])

    useEffect(() => {
        const handleRecord = ({ record }: { record: Record<string, string>; }) => {
            setRecord(record)
            console.log('AutoDeleteRecord:', method)
        };

        const unsubscribe = subscribe(`${componentId}_setRecord`, handleRecord);

        return () => {
            unsubscribe();
        };
    }, [componentId, method, endpoint, fillable]);


    const closeModal = () => {
        const modal = document.querySelector(`#${componentId}Modal`) as any
        if (modal) {
            modal.close();
        }
    };

    return (
        <>
            <div className="border-b border-b-gray-400 mb-5">
                <h3 className="font-bold text-lg text-danger">Are you sure you want to delete {localTitle}?</h3>
            </div>
            <div className="w-2/4 mx-auto">
                <div className='mt-6 flex justify-between'>
                    <button className="btn btn-neutral btn-default" onClick={closeModal}>Cancel</button>
                    <button className="btn btn-error">Delete</button>
                </div>
            </div>
        </>
    );
};

export default AutoDeleteRecord;
