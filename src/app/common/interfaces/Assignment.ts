import { Incident } from './Incident';

export interface Assignment {
    id?: string;
    name: string;
    date: string;
    feedback: string;
    incidents: string[];
    data?: Incident[];
    grade: number;
    file?: {
        fileName?: string;
        fileURL?: string;
    }
}