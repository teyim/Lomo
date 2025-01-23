import { errorMessages } from "../constants";
import { DatabaseActions } from "../types";

export const getDataAccessErrorMessage = (
  component: string,
  action: DatabaseActions
): string => {
  const actionMessage = errorMessages[action];
  if (!actionMessage) {
    return `Invalid database action: ${action}`;
  }
  return `Error ${actionMessage} ${component} from the database`;
};
