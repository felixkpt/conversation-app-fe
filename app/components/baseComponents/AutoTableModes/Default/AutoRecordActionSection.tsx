'use client';

import { ActionListType, KnownActionsType, ActionType } from "@/app/components/Autos/autoTypes";
import Link from "next/link";
import { getEndpoint } from "../../Autos/BaseAutoModel/autoFunctions";

type Props = {
    componentId: string;
    record: any;
    actionLabels: Partial<ActionListType>;
    recordEndpoint: string;
    actionType?: ActionType;
};

const AutoRecordActionSection = ({ componentId, record, recordEndpoint, actionLabels, actionType = 'dropdown' }: Props) => {

    if (Object.keys(actionLabels).length === 0) return

    const actionsList = Object.keys(actionLabels) as KnownActionsType[]

    return (
        <>
            {
                actionType === 'dropdown' ?
                    <>
                        <div className="dropdown">

                            <ul className="menu lg:menu-horizontal bg-base-200 rounded-box">
                                <li>
                                    <details>
                                        <summary tabIndex={0} role="button" className="py-0.5 px-2.5">Action</summary>
                                        <ul tabIndex={0} className="p-2 shadow-lg menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                            {
                                                actionsList.map(actionKey => (
                                                    <li
                                                        key={`${actionKey}`}
                                                        className={`p-1 cursor-pointer rounded`}
                                                    >
                                                        <Link
                                                            data-action={`${actionKey}`}
                                                            data-id={record.id}
                                                            data-target={getEndpoint(actionLabels, record, recordEndpoint, actionKey)}
                                                            href={getEndpoint(actionLabels, record, recordEndpoint, actionKey)}
                                                            className={`m-1 ${actionLabels[actionKey].classes}`}
                                                        >
                                                            {actionLabels[actionKey].label}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>

                    </>
                    :
                    <div className={`buttons ${componentId}AutoRecordActionSection`}>
                        {
                            actionsList.map(actionKey => (
                                <Link
                                    key={`${actionKey}`}
                                    data-action={`${actionKey}`}
                                    data-id={record.id}
                                    data-target={getEndpoint(actionLabels, record, recordEndpoint, actionKey)}
                                    href={getEndpoint(actionLabels, record, recordEndpoint, actionKey)}
                                    className={`btn btn-sm m-1 ${actionLabels[actionKey].classes}`}
                                >
                                    {actionLabels[actionKey].label}
                                </Link>
                            ))
                        }
                    </div>
            }
        </>
    );
}

export default AutoRecordActionSection;
