import { Incident } from './Incident';

export interface Assignment {
    id?: string;
    name: string;
    date: string;
    feedback?: string;
    incidents?: string[];
    data?: Incident[]; //This is for the chips components of materialize, it need a field named data
    grade?: number;
    file?: {
        id?: string;
        fileName?: string;
        fileURL?: string;
    }
    placeholder?: string; //Also for chips, needs a field with this name
}