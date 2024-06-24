'use client';

import { HeaderType, RecordType } from "./BaseAutoModel/types";

type Props = {
    headers: HeaderType[];
    record: RecordType | undefined;
    componentId: string;
    AutoTableHeaderActions?: React.ElementType<{ componentId: string, record: RecordType }>;
    isFromAutoView?: boolean
};

const AutoTableSingle = ({ record, headers = [], componentId, AutoTableHeaderActions, isFromAutoView }: Props) => {
    const tableComponentId = `${componentId}AutoTable`;

    const actionHeader = !isFromAutoView && headers.find(header => header.key === 'action');

    console.log(actionHeader)
    return (
        <div className="autotableWrapper" id={tableComponentId}>
            <table className="table">
                {actionHeader && (
                    <thead>
                        <tr>
                            <td className={`${tableComponentId} data-${actionHeader.key}`} colSpan={2}>
                                <div className="w-full flex justify-end">
                                    {record && record[actionHeader.key]}
                                </div>
                            </td>
                        </tr>
                    </thead>
                )}
                <tbody>
                    {headers.filter(header => header.key !== 'action').map((column, index) => (
                        <tr key={index} className={`${tableComponentId} row-${column.key}`}>
                            <td className={`${tableComponentId} heading-${column.key}`}>{column.label || column.key}</td>
                            <td className={`${tableComponentId} data-${column.key}`}>{record && record[column.key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AutoTableSingle;
