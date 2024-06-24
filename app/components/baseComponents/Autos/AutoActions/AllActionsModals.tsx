import React from 'react';
import AutoModal from '../AutoModal';
import AutoCreateOrUpdateRecord from './AutoCreateOrUpdateRecord';
import AutoViewRecord from './AutoViewRecord';
import AutoUpdateStatus from './AutoUpdateStatus';
import AutoDeleteRecord from './AutoDeleteRecord';
import AutoArchiveRecord from './AutoArchiveRecord';
import { FillableType } from '../BaseAutoModel/types';

type Props = {
    componentId: string;
    modelName: string;
    apiEndpoint: string;
    fillableFields: FillableType[];
};

const AllActionsModals: React.FC<Props> = ({ componentId, modelName, apiEndpoint, fillableFields }) => {
    return (
        <div>
            <AutoModal componentId={`${componentId}CreateOrUpdate`} title={modelName.charAt(0).toUpperCase() + modelName.slice(1)}>
                <AutoCreateOrUpdateRecord
                    componentId={`${componentId}CreateOrUpdate`}
                    modelName={modelName}
                    method="POST"
                    endpoint={apiEndpoint}
                    fillable={fillableFields}
                />
            </AutoModal>
            <AutoModal componentId={`${componentId}View`} title={modelName.charAt(0).toUpperCase() + modelName.slice(1)}>
                <AutoViewRecord
                    componentId={`${componentId}View`}
                    modelName={modelName}
                    method="GET"
                    endpoint={apiEndpoint}
                    fillable={fillableFields}
                />
            </AutoModal>
            <AutoModal componentId={`${componentId}UpdateStatus`} title={modelName.charAt(0).toUpperCase() + modelName.slice(1)}>
                <AutoUpdateStatus
                    componentId={`${componentId}UpdateStatus`}
                    modelName={modelName}
                    method="GET"
                    endpoint={apiEndpoint}
                    fillable={fillableFields}
                />
            </AutoModal>
            <AutoModal componentId={`${componentId}Archive`} title={modelName.charAt(0).toUpperCase() + modelName.slice(1)}>
                <AutoArchiveRecord
                    componentId={`${componentId}Archive`}
                    modelName={modelName}
                    method="POST"
                    endpoint={apiEndpoint}
                    fillable={fillableFields}
                />
            </AutoModal>
            <AutoModal componentId={`${componentId}Delete`} title={modelName.charAt(0).toUpperCase() + modelName.slice(1)}>
                <AutoDeleteRecord
                    componentId={`${componentId}Delete`}
                    modelName={modelName}
                    method="DELETE"
                    endpoint={apiEndpoint}
                    fillable={fillableFields}
                />
            </AutoModal>
        </div>
    );
};

export default AllActionsModals;
