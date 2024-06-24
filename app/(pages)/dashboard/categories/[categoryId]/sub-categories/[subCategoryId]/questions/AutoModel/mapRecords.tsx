import AutoRecordActionSection from '@/app/components/baseComponents/AutoTableModes/Default/AutoRecordActionSection';
import ModelType from '../../../AutoModel/types';
import { ActionListType } from '@/app/components/baseComponents/Autos/BaseAutoModel/types';

const mapRecords = (
  records: ModelType[],
  COMPONENT_ID: string,
  apiEndpoint: string,
  ACTION_LABELS: Partial<ActionListType>,
  ACTION_TYPE: string,
  isSingle?: boolean,
) => {
  return records.map(record => ({
    ...record,
    action: (
      <AutoRecordActionSection
        key={record.id}
        componentId={COMPONENT_ID}
        record={record}
        recordEndpoint={isSingle ? apiEndpoint : `${apiEndpoint}/${record.id}/`}
        actionLabels={ACTION_LABELS}
        actionType={ACTION_TYPE}
      />
    ),
  }));
};

export default mapRecords;
