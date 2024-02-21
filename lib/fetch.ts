import { Result, ok, err } from "@/models/result";

export async function fetchJson<T extends { [key: string]: any }>(
  url: string,
  init?: RequestInit,
): Promise<Result<T, string>> {
  try {
    const request = await fetch(url, {
      next: {
        revalidate: 60 * 60,
      },
      ...init,
    });

    if (!request.ok) {
      return err("Request failed");
    }

    const json = await request.json();
    return ok(json);
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }
    console.error(e);
    return err("Unknown error");
  }
}
