import React, { useCallback, useEffect } from 'react'
import { KnownActionsType, RecordType } from '../BaseAutoModel/types';
import { useRouter } from 'next/navigation';

type Props = {
    records: RecordType[]
    actionLabels: any
    defaultActionHandlers: any
    headers: any
    apiEndpoint: any
    componentId: string
}

const useHandleRecordAction = ({ records, actionLabels, defaultActionHandlers, headers, apiEndpoint, componentId }: Props) => {

    const router = useRouter()

    const handleRecordAction = useCallback((e: Event) => {
        const target = e.target as HTMLElement;
    
        const action = target.getAttribute('data-action') as KnownActionsType;
        const dataTarget = target.getAttribute('data-target') as KnownActionsType;
        const recordId = target.getAttribute('data-id');
    
        if (action && recordId) {
          e.preventDefault();
          const record = records.find(record => record.id.toString() === recordId);
          if (record) {
            const actionConfig = actionLabels[action];
            if (actionConfig) {
              if (actionConfig.action === 'modal') {
                defaultActionHandlers[action](record, headers);
              } else if (actionConfig.action === 'navigation') {
                router.push(dataTarget);
              }
            } else {
              console.error(`Action configuration for "${action}" not found.`);
            }
          } else {
            console.error(`Record with ID ${recordId} not found.`);
          }
        } else {
        }
      }, [records, actionLabels, defaultActionHandlers, apiEndpoint]);
    
      useEffect(() => {
        const handleTableClick = (e: Event) => {
          handleRecordAction(e);
        };
    
        const componentTable = document.getElementById(`${componentId}AutoTable`);
        if (componentTable) {
          componentTable.addEventListener('click', handleTableClick);
          return () => {
            componentTable.removeEventListener('click', handleTableClick);
          };
        }
      }, [records, handleRecordAction]);
    
    return null
}

export default useHandleRecordAction