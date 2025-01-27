export interface ErrorWithStatus extends Error {
  status?: number;
}


export type DatabaseActions = "get" | "create" | "update" | "delete";
