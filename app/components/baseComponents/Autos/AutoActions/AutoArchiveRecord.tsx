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

const AutoArchiveRecord: React.FC<Props> = ({ componentId, modelName, method, endpoint, fillable }) => {
    const [localTitle, setLocalTitle] = useState(`Archive ${modelName} record`)
    const [record, setRecord] = useState<any>();

    useEffect(() => {
        if (record) {
            setLocalTitle(`Archive ${modelName} record #${record.id}`)
        } else {
            setLocalTitle(`Archive ${modelName} record`)
        }
    }, [record])

    useEffect(() => {
        const handleRecord = ({ record }: { record: Record<string, string>; }) => {
            setRecord(record)
            console.log('AutoArchiveRocord:', method)
        };

        const unsubscribe = subscribe(`${componentId}_setRecord`, handleRecord);

        return () => {
            unsubscribe();
        };
    }, [componentId, method, endpoint, fillable]);

    return (
        <>
            <div className="border-b border-b-gray-400 mb-5">
                <h3 className="font-bold text-lg text-gray-300">{localTitle}</h3>
            </div>

            Archiving...
        </>
    );
};

export default AutoArchiveRecord;
