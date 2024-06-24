'use client';
import { usePathname } from 'next/navigation';
// Start AutoModel imports
import getConstants from '../AutoModel/getConstants';
import mapRecords from './sub-categories/AutoModel/mapRecords';
import Renderer from '@/app/components/baseComponents/Autos/AutoPage/RenderSingle';
import Link from 'next/link';
// End AutoModel imports

const page = () => {
  const {
    MODEL_NAME,
    MODEL_NAME_PLURAL,
    COMPONENT_ID,
    ACTION_LABELS,
    HEADERS,
    FILLABLE_FIELDS
  } = getConstants;

  const pathname = usePathname()
  const apiEndpoint = pathname;

  const actionType = 'buttons'
  const actionLabels = ACTION_LABELS
  const isSingle = true
  return (
    <>
      <Renderer
        modelName={MODEL_NAME}
        modelNamePlural={MODEL_NAME_PLURAL}
        componentId={COMPONENT_ID}
        apiEndpoint={apiEndpoint}
        fillableFields={FILLABLE_FIELDS}
        headers={HEADERS}
        mapRecords={records => mapRecords(records, COMPONENT_ID, apiEndpoint, actionLabels, actionType, isSingle)}
        actionLabels={actionLabels}
        isSingle={isSingle}
      />
      <Link className="btn" href={`${apiEndpoint}/sub-categories`}>View Sub cats</Link>
    </>
  );
};

export default page;
