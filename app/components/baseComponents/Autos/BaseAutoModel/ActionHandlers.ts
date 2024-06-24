import { publish } from '@/app/components/baseComponents/utils/helpers';
import { ActionHandlersInterface, HeaderType, RecordType } from './types';

class ActionHandlers implements ActionHandlersInterface {
  private componentId: string;
  private apiEndpoint: string;
  private isSingle?: boolean;

  constructor(componentId: string, apiEndpoint: string, isSingle?: boolean) {
    this.componentId = componentId;
    this.apiEndpoint = apiEndpoint;
    this.isSingle = isSingle;
  }

  viewRecord = (record: RecordType, headers: HeaderType[]) => {
    console.log('Viewing record', record);
    publish(`${this.componentId}View_setRecord`, {
      record,
      endpoint: this.isSingle ? this.apiEndpoint : `${this.apiEndpoint}/${record.id}`,
      method: 'GET',
      headers
    }); // Set the record to be shown

    publish(`${this.componentId}View_showModal`, record); // Show modal for viewing
  };

  editRecord = (record: RecordType) => {
    publish(`${this.componentId}CreateOrUpdate_editRecord`, {
      record,
      endpoint: this.isSingle ? this.apiEndpoint : `${this.apiEndpoint}/${record.id}`,
      method: 'PUT',
    }); // Set the record to be edited

    publish(`${this.componentId}CreateOrUpdate_showModal`, record); // Show modal for edit
  };

  updateRecordStatus = (record: RecordType) => {
    console.log('Updating status of record', record);
    publish(`${this.componentId}UpdateStatus_setRecord`, {
      record,
      endpoint: this.isSingle ? this.apiEndpoint : `${this.apiEndpoint}/${record.id}/status`,
      method: 'PATCH',
    }); // Update the record status

    publish(`${this.componentId}UpdateStatus_showModal`, record); // Show modal for status update
  };

  archiveRecord = (record: RecordType) => {
    console.log('Archiving record', record);
    publish(`${this.componentId}Archive_setRecord`, {
      record,
      endpoint: this.isSingle ? this.apiEndpoint : `${this.apiEndpoint}/${record.id}/archive`,
      method: 'POST',
    }); // Archive the record

    publish(`${this.componentId}Archive_showModal`, record); // Show modal for archiving
  };

  deleteRecord = (record: RecordType) => {
    console.log('Deleting record', record);
    publish(`${this.componentId}Delete_setRecord`, {
      record,
      endpoint: this.isSingle ? this.apiEndpoint : `${this.apiEndpoint}/${record.id}`,
      method: 'DELETE',
    }); // Delete the record

    publish(`${this.componentId}Delete_showModal`, record); // Show modal for deletion
  };
}

export default ActionHandlers;
