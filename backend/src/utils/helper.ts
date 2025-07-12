import { Request } from "express";
// Filter setup
export const getFilter = (query: Request["query"], keys: string[]): Record<string, string | null> => {
        const result: Record<string, string | null> = {};
        for (const key of keys) {
            const value = query[key];
            result[key] = typeof value === 'string' ? value?.trim() : null;
        }
        return result;
    };