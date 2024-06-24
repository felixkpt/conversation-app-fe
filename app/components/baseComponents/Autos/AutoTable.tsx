'use client'

import { HeaderType } from "./BaseAutoModel/types";

type Props = {
    headers: HeaderType[];
    records: any[];
    componentId: string
    AutoTableHeaderActions?: React.ElementType

};

const AutoTable = ({ records, headers, componentId, AutoTableHeaderActions }: Props) => {
    componentId = componentId + 'AutoTable'

    return (
        <div className="autotableWrapper" id={componentId}>
            {AutoTableHeaderActions
                &&
                <AutoTableHeaderActions componentId={componentId} records={records} />
            }
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((column, index) => (
                            <th key={index} className={`${componentId} heading-${column.key}`}>{column.label || column.key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((column, colIndex) => (
                                <td key={colIndex} className={`${componentId} data-${column.key}`}>{record[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AutoTable;
