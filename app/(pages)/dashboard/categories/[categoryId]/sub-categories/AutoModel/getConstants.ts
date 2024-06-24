import createModelConstants from "@/app/components/baseComponents/Autos/BaseAutoModel/constants";
import { ActionLabelsActionsType } from "@/app/components/baseComponents/Autos/BaseAutoModel/types";

// Define variables for model name and API endpoint
const modelName = 'sub-category';
const apiEndpoint = '/dashboard/categories/{categoryId}/sub-categories';

// Define fillable fields for the sub-category model
const fillableFields = [
  { name: 'name', type: 'text', label: 'Name', value: 'Test' },
  { name: 'learn_instructions', type: 'textarea', label: 'l instructions', value: 'Describe' }
];

// Define headers for displaying in the UI (e.g., table headers) set singleViewOnly: true to hide in listing of multiple
const headers = [
  { key: 'name', label: 'Name', singleViewOnly: false },
  { key: 'learn_instructions', label: 'Instructions', singleViewOnly: true },
  { key: 'created_at', label: 'Created at', singleViewOnly: false },
  { key: 'action', label: 'Action', singleViewOnly: false },
];

// Define default values for creating a new record
const newRecordDefaults = { id: undefined, name: 'Test', description: 'Describe' };

// Define action labels and their associated actions
const actionLabelsActions: ActionLabelsActionsType = {
  viewRecord: { action: 'navigation', show: true },
  editRecord: { action: 'modal', show: true },
  updateRecordStatus: { action: 'modal', show: true },
  archiveRecord: { action: 'modal', show: true },
  deleteRecord: { action: 'modal', show: true },
};

// Create category constants using the createModelConstants function
const getConstants = createModelConstants(
  modelName,          // modelName: Name of the model
  apiEndpoint,        // apiEndpoint: API endpoint for categories
  fillableFields,     // fillableFields: Fields that can be filled when creating or updating records
  headers,            // headers: Headers to display in the UI
  newRecordDefaults,  // newRecordDefaults: Default values for creating a new record
  actionLabelsActions // actionLabelsActions: Actions associated with action labels
);

export default getConstants;
