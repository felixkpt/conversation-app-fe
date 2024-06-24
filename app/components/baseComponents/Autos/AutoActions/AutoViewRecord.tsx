'use client'
import { useEffect, useState } from 'react';
import { subscribe } from '../../utils/helpers';
import { HttpVerb } from '@/app/components/baseComponents/types';
import { FillableType, HeaderType } from '../BaseAutoModel/types';
import AutoTableSingle from '../AutoTableSingle';


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

const AutoViewRecord: React.FC<Props> = ({ componentId, modelName, method, endpoint, fillable }) => {
    const [localTitle, setLocalTitle] = useState(`Viewing ${modelName}`)
    const [record, setRecord] = useState<any>();
    const [headers, setHeaders] = useState<any>();

    useEffect(() => {
        if (record) {
            setLocalTitle(`Viewing ${modelName} #${record.id}`)
        } else {
            setLocalTitle(`Viewing ${modelName}`)
        }
    }, [record])

    useEffect(() => {
        const handleRecord = ({ record, headers }: { record: Record<string, string>; headers: HeaderType[] }) => {
            setRecord(record)
            setHeaders(headers)
            console.log('handleRecord:', method)
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
            <AutoTableSingle
                record={record}
                headers={headers}
                componentId={componentId}
                isFromAutoView={true}
            />
        </>
    );
};

export default AutoViewRecord;
