import { publish } from "../utils/helpers";

type AutoHeaderProps = {
    headerTitle: string;
    description: string;
    componentId: string;
    showCreateButton?: boolean;
};

const AutoHeader = ({ headerTitle, description, componentId, showCreateButton }: AutoHeaderProps) => {
    return (
        <div className="flex items-center justify-between my-4">
            <div>
                <h2 className="text-2xl font-semibold">{headerTitle}</h2>
                {description && <p className="text-gray-500">{description}</p>}
            </div>
            {showCreateButton && (
                <button className="btn btn-success btn-sm" onClick={() => {
                    publish(`${componentId}_newRecord`, null)
                    publish(`${componentId}_showModal`, null)
                }}>Create new</button>
            )}
        </div>
    );
};

export default AutoHeader;
