import React, {useEffect, useState } from 'react';
import axios from 'axios';
import AutoHeader from '../AutoHeader';
import DefaultAutoTableHeaderActions from '@/app/components/baseComponents/AutoTableModes/Default/AutoTableHeaderActions';
import { appConfig } from '@/app/components/baseComponents/utils/helpers';
import useAutoPostDone from '@/app/components/baseComponents/hooks/useAutoPostDone';
import { ActionHandlersInterface, ActionListType, FillableType, HeaderType, KnownActionsType, RecordType } from '../BaseAutoModel/types';
import DefaultActionHandlers from '../BaseAutoModel/ActionHandlers';
import AutoTableSingle from '../AutoTableSingle';
import AllActionsModals from '../AutoActions/AllActionsModals';
import AllActionsAutoPosts from '../AutoActions/AllActionsAutoPosts';
import useHandleRecordAction from './useHandleRecordAction';

type Props = {
  modelName: string;
  modelNamePlural: string;
  componentId: string;
  apiEndpoint: string;
  fillableFields: FillableType[];
  headers: HeaderType[];
  AutoTableHeaderActions?: React.ElementType;
  ActionHandlers?: new (componentId: string, apiEndpoint: string, isSingle?: boolean) => ActionHandlersInterface;
  mapRecords: (record: any[]) => any[];
  actionLabels: Partial<ActionListType>;
  isSingle?: boolean
};

const Renderer: React.FC<Props> = ({
  modelName,
  modelNamePlural,
  componentId,
  apiEndpoint,
  fillableFields,
  headers,
  AutoTableHeaderActions,
  ActionHandlers,
  mapRecords,
  actionLabels,
  isSingle,
}) => {
  const defaultActionHandlers = ActionHandlers ? new ActionHandlers(componentId, apiEndpoint, isSingle) : new DefaultActionHandlers(componentId, apiEndpoint, isSingle);

  const [record, setRecord] = useState<RecordType>({});
  const { response } = useAutoPostDone({ componentId });

  const fetchRecord = async () => {
    try {
      const response = await axios.get(appConfig.api.url(apiEndpoint));
      setRecord(mapRecords([response.data] || [])[0]);
    } catch (error) {
      console.error(`Error fetching ${modelNamePlural}:`, error);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  useEffect(() => {
    if (response && response.status === 200) {
      fetchRecord();
    }
  }, [response]);


  const records = [record]
  // use useHandleRecordAction
  useHandleRecordAction({records, actionLabels, defaultActionHandlers, headers, apiEndpoint, componentId})

  return (
    <div>
      <AutoHeader
        headerTitle={`${modelName.charAt(0).toUpperCase() + modelName.slice(1)} ${record?.id ? '#' + record.id : ''}`}
        description=""
        componentId={`${componentId}CreateOrUpdate`}
      />
      <AutoTableSingle
        record={record}
        headers={headers}
        componentId={componentId}
        AutoTableHeaderActions={AutoTableHeaderActions || DefaultAutoTableHeaderActions}
      />
      <AllActionsModals
        componentId={componentId}
        modelName={modelName}
        apiEndpoint={apiEndpoint}
        fillableFields={fillableFields}
      />
      <AllActionsAutoPosts componentId={componentId} />

    </div>
  );
};

export default Renderer;
