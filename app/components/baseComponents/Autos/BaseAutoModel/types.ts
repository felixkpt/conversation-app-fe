
export type KnownActionsType = 'viewRecord' | 'editRecord' | 'updateRecordStatus' | 'archiveRecord' | 'deleteRecord';

export type RecordType = { [key: string]: any };

export interface ActionHandlersInterface {
    viewRecord: (record: RecordType, headers: HeaderType[]) => void;
    editRecord: (record: RecordType) => void;
    updateRecordStatus: (record: RecordType) => void;
    archiveRecord: (record: RecordType) => void;
    deleteRecord: (record: RecordType) => void;
}


export type ActionType = 'dropdown' | 'buttons'

export type ActionItemType = {
    label: string;
    slug: string | null;
    classes: string;
    action: 'modal' | 'navigation';
    show: boolean
};

export type ActionLabelsActionsType = {
    viewRecord: Pick<ActionItemType, 'action' | 'show'>;
    editRecord: Pick<ActionItemType, 'action' | 'show'>;
    updateRecordStatus: Pick<ActionItemType, 'action' | 'show'>;
    archiveRecord: Pick<ActionItemType, 'action' | 'show'>;
    deleteRecord: Pick<ActionItemType, 'action' | 'show'>;
};

export type ActionListType = {
    [key in KnownActionsType]: ActionItemType;
};

export type HeaderType = {
    key: string;
    searchKey?: string;
    label?: string;
    singleViewOnly?: boolean
};


export type FillableType = {
    name: string;
    type: string;
    label: string;
    value?: string;
};
