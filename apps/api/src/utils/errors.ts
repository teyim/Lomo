import { crudErrorMessages } from "../constants";
import { DatabaseActions } from "../types";
import { ErrorWithStatus } from "../types/error";

export const getDataAccessErrorMessage = (
  component: string,
  action: DatabaseActions,
): string => {
  const actionMessage = crudErrorMessages[action];
  if (!actionMessage) {
    return `Invalid database action: ${action}`;
  }
  return `Error ${actionMessage} ${component} from the database`;
};

export function handleError(error: any) {
  if (error instanceof ErrorWithStatus) {
    throw error;
  } else {
    throw new Error(error);
  }
}
