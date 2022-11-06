import { Social } from './../models/social.model';
import { CmsResp } from '../models/cms-resp.model';
import { Page } from '../models/page.model';

async function fetchOrThrow<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Request failed with status ${response.status}`);
    }
}

export async function getCmsPage(id: string): Promise<CmsResp<Page>> {
    return fetchOrThrow<CmsResp<Page>>(`${getCmsBaseUrl()}/items/Pages/${id}`);
}
export async function getCmsSocials(): Promise<CmsResp<Social[]>> {
    return fetchOrThrow<CmsResp<Social[]>>(`${getCmsBaseUrl()}/items/Socials`);
}

function getCmsBaseUrl() {
    return process.env.CMS_URL || 'https://directus.kacperserewis.net';
}