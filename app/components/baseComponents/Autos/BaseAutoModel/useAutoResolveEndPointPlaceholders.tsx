import { useParams } from "next/navigation";

type Props = {
    apiEndpoint: string;
};

const useAutoResolveEndPointPlaceholders = ({ apiEndpoint }: Props): string => {

    const params = useParams();

    // Function to replace placeholders with actual values from params
    const resolvedEndpoint = apiEndpoint.replace(/{([^}]+)}/g, (_, key: string) => {
        return (params[key] as string) || `{${key}}`; // Replace with param value or keep placeholder if not found
    });

    return resolvedEndpoint;
};

export default useAutoResolveEndPointPlaceholders;
