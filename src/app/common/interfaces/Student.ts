import { Assignment } from './Assignment';

export interface Student {
    id?: string;
    name: string;
    assignments?: Assignment[];
}