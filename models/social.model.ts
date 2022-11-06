export interface ISocial {
    id: string;
    name: string;
    username: string;
    url: string;
}

export class Social implements ISocial {
    id: string;
    name: string;
    username: string;
    url: string;

    constructor(id: string, name: string, username: string, url: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.url = url;
    }
}