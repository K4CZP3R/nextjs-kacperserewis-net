export interface IPage {
    id: string;
    mainText: string;
    subText: string;
    botText: string;
}

export class Page implements IPage {
    id: string;
    mainText: string;
    subText: string;
    botText: string;

    constructor(data: IPage) {
        this.id = data.id;
        this.mainText = data.mainText;
        this.subText = data.subText;
        this.botText = data.botText;
    }

    
}