import { ActionListType, ActionType, ActionLabelsActionsType } from "./types";
import Pluralize from 'pluralize';

// Define the structure of the constants object returned by createModelConstants
type ModelConstants = {
  MODEL_NAME: string;
  MODEL_NAME_PLURAL: string;
  COMPONENT_ID: string;
  API_ENDPOINT: string;
  FILLABLE_FIELDS: Array<{ name: string, type: string, label: string, value: any }>;
  HEADERS: Array<{ key: string, label: string }>;
  NEW_RECORD_DEFAULTS: Record<string, any>;
  ACTION_LABELS: Partial<ActionListType>;
  ACTION_TYPE: ActionType;
};

// Function to create constants specific to a model
const createModelConstants = (
  modelName: string,
  apiEndpoint: string,
  fillableFields: Array<{ name: string, type: string, label: string, value: any }>,
  headers: Array<{ key: string, label: string }>,
  newRecordDefaults: Record<string, any>,
  actionLabelsActions: ActionLabelsActionsType
): ModelConstants => {
  const modelNamePlural = Pluralize(modelName, true)

  // Define default action labels with action type
  const defaultActionLabels = {
    viewRecord: { label: 'View', slug: null, classes: 'text-blue-500', action: actionLabelsActions.viewRecord.action, show: actionLabelsActions.viewRecord.show },
    editRecord: { label: 'Edit', slug: 'edit', classes: 'text-yellow-500', action: actionLabelsActions.editRecord.action, show: actionLabelsActions.editRecord.show },
    updateRecordStatus: { label: 'Update Status', slug: 'update-status', classes: 'text-green-500', action: actionLabelsActions.updateRecordStatus.action, show: actionLabelsActions.updateRecordStatus.show },
    archiveRecord: { label: 'Archive', slug: 'archive', classes: 'text-gray-500', action: actionLabelsActions.archiveRecord.action, show: actionLabelsActions.archiveRecord.show },
    deleteRecord: { label: 'Delete', slug: 'delete', classes: 'text-red-500', action: actionLabelsActions.deleteRecord.action, show: actionLabelsActions.deleteRecord.show },
  };

  // Filter action labels based on 'show' property
  const filteredActionLabels: any = {};
  for (const key in defaultActionLabels) {
    const defAct: any = defaultActionLabels

    if (defAct[key].show) {
      filteredActionLabels[key] = defAct[key];
    }
  }

  return {
    MODEL_NAME: modelName,
    MODEL_NAME_PLURAL: modelNamePlural,
    COMPONENT_ID: `${modelName}Component`,
    API_ENDPOINT: apiEndpoint,
    FILLABLE_FIELDS: fillableFields,
    HEADERS: headers,
    NEW_RECORD_DEFAULTS: newRecordDefaults,
    ACTION_LABELS: filteredActionLabels as Partial<ActionListType>,
    ACTION_TYPE: 'dropdown', // Default action type is dropdown
  };
};

export default createModelConstants;
