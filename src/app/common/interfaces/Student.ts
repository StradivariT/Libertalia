import { Assignment } from './Assignment';

export interface Student {
    id?: string;
    name: string;
    number: number;
    assignments?: Assignment[];
}