export interface IProject {
    id: string;
    status: "published";
    date_created: string;
    date_updated: string;
    title: string;
    description: string;
    buttons: number[];
}