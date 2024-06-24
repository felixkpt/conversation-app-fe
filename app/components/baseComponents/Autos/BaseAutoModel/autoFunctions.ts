import { ActionListType, KnownActionsType } from "./types";

// Function to determine the endpoint to use
export const getEndpoint = (actionLabels: ActionListType, record: any, recordEndpoint: string, actionKey: KnownActionsType) => {
  // Replace '{id}' placeholder in endpoint with record.id
  const resolved = `${recordEndpoint.replace('{id}', record.id)}`;
  const slug = actionLabels[actionKey].slug;

  return (slug ? `${resolved}/${slug}` : resolved).replace(/\/+/g, '/');
};

