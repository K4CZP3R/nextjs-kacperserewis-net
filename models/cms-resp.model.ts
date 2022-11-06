export interface ICmsResp<T> {
    data: T;
}

export class CmsResp<T> implements ICmsResp<T> {
    data: T;

    constructor(data: T) {
        this.data = data;
    }
}