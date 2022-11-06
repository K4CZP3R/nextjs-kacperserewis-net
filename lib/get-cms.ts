import { IProject } from './../models/project.model';
import { Social } from './../models/social.model';
import { CmsResp } from '../models/cms-resp.model';
import { Page } from '../models/page.model';

async function fetchOrThrow<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Request failed with status ${response.status}: ${await response.text()}`);
    }
}

export async function getCmsPage(id: string): Promise<CmsResp<Page>> {
    return fetchOrThrow<CmsResp<Page>>(`${getCmsBaseUrl()}/items/Pages/${id}`);
}
export async function getCmsSocials(): Promise<CmsResp<Social[]>> {
    return fetchOrThrow<CmsResp<Social[]>>(`${getCmsBaseUrl()}/items/Socials`);
}
export async function getCmsProjects(): Promise<CmsResp<IProject[]>> {
    return fetchOrThrow<CmsResp<IProject[]>>(`${getCmsBaseUrl()}/items/Projects`);
}

export async function getCmsProject(id: string): Promise<IProject | null> {
    return fetchOrThrow<CmsResp<IProject>>(`${getCmsBaseUrl()}/items/Projects/${id}`).then((r) => r.data).catch(() => null);
}

function getCmsBaseUrl() {
    return process.env.CMS_URL || 'https://directus.kacperserewis.net';
}