/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// Start AutoModel imports
import getConstants from './AutoModel/getConstants';
import mapRecords from './[categoryId]/sub-categories/AutoModel/mapRecords';
import Renderer from '@/app/components/baseComponents/Autos/AutoPage/RenderList';
import useAutoResolveEndPointPlaceholders from '@/app/components/baseComponents/Autos/BaseAutoModel/useAutoResolveEndPointPlaceholders';
// End AutoModel imports

const page = () => {
  const {
    MODEL_NAME,
    MODEL_NAME_PLURAL,
    COMPONENT_ID,
    API_ENDPOINT,
    ACTION_LABELS,
    ACTION_TYPE,
    HEADERS,
    FILLABLE_FIELDS
  } = getConstants;

  const apiEndpoint = useAutoResolveEndPointPlaceholders({ apiEndpoint: API_ENDPOINT });

  return (
    <Renderer
      modelName={MODEL_NAME}
      modelNamePlural={MODEL_NAME_PLURAL}
      componentId={COMPONENT_ID}
      apiEndpoint={apiEndpoint}
      fillableFields={FILLABLE_FIELDS}
      headers={HEADERS}
      mapRecords={records => mapRecords(records, COMPONENT_ID, apiEndpoint, ACTION_LABELS, ACTION_TYPE)}
      actionLabels={ACTION_LABELS}
    />
  );
};

export default page;
