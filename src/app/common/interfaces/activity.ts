export interface Activity {
    id:            number;
    name:          string;
    file?:         File;
    fileName?:     string;
    fileStorage?:  string;
    grade?:        string;
    feedback?:     string;
    incidents?:    string;
    turnedInDate?: string;
}