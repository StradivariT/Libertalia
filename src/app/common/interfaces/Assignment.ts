import { Incident } from './Incident';

export interface Assignment {
    id?: string;
    name: string;
    date: string;
    feedback?: string;
    incidents?: string;
    grade?: number;
    file?: {
        id?: string;
        fileName?: string;
        fileURL?: string;
    }
}