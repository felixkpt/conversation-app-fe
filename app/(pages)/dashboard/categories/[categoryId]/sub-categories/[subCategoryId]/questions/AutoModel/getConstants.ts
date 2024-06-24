import createModelConstants from "@/app/components/baseComponents/Autos/BaseAutoModel/constants";
import { ActionLabelsActionsType } from "@/app/components/baseComponents/Autos/BaseAutoModel/types";

// Define variables for model name and API endpoint
const modelName = 'question';
const apiEndpoint = '/dashboard/categories/{categoryId}/sub-categories/{subCategoryId}/questions';

// Define fillable fields for the question model
const fillableFields = [
  { name: 'question', type: 'text', label: 'Question', value: 'Test Question' },
  { name: 'marks', type: 'number', label: 'Weight/marks', value: 0 }
];

// Define headers for displaying in the UI (e.g., table headers) set singleViewOnly: true to hide in listing of multiple
const headers = [
  { key: 'question', label: 'Quiz', singleViewOnly: false },
  { key: 'marks', label: 'Weig/Mark', singleViewOnly: false },
  { key: 'created_at', label: 'Created at', singleViewOnly: false },
  { key: 'action', label: 'Action', singleViewOnly: false },
];

// Define default values for creating a new record
const newRecordDefaults = { id: undefined, question: 'Test Question', marks: 1 };

// Define action labels and their associated actions
const actionLabelsActions: ActionLabelsActionsType = {
  viewRecord: { action: 'modal', show: true },
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
