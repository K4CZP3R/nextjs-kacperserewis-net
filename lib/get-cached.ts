import { getBadgeConfigKey } from "@/models/project.model";
import { fetchJson } from "./fetch";

export async function getCachedBadgeData(
  {
    label,
    project,
  }: {
    label?: string;
    project?: string;
  },
  onlyCached = true
) {
  const key = getBadgeConfigKey({ label, project });

  const cachedResponse = await fetchJson(
    `${process.env.API_URL}/cached-responses?filters[key][$eq]=${key}`,
    {
      headers: { Authorization: "Bearer " + process.env.API_KEY },
      cache: "no-store",
      next: {
        revalidate: undefined,
      },
    }
  );

  if (cachedResponse.isErr()) {
    console.error("Error fetching cached response", cachedResponse);
    return null;
  }

  const cached = cachedResponse
    .unwrap()
    .data.find((d: any) => d.attributes.key === key);

  const isNew = !cached;
  const secondsOld = cached
    ? (new Date().getTime() - new Date(cached.attributes.updatedAt).getTime()) /
      1000
    : 0;

  if (!onlyCached && (!cached || secondsOld > 86400)) {
    console.log(
      key,
      "is not cached or is older than 24 hours",
      isNew,
      secondsOld,
      cached ? cached.attributes.updatedAt : ""
    );

    const wakaResponse = await fetchJson(
      `${
        process.env.WAKAPI_URL
      }/api/compat/wakatime/v1/users/kacper/stats/all_time?${
        label ? `label=${label}` : project ? `project=${project}` : ""
      }`,
      {
        cache: "no-store",
      }
    );

    if (!wakaResponse.isErr()) {
      const waka = wakaResponse.unwrap().data;

      const addResponse = await fetch(
        isNew
          ? `${process.env.API_URL}/cached-responses`
          : `${process.env.API_URL}/cached-responses/${cached.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.API_KEY,
          },
          body: JSON.stringify({
            data: {
              key,
              response: waka,
            },
          }),
        }
      );

      if (!addResponse.ok) {
        console.error("Error adding cached response", addResponse);
        return {
          error: "Error adding cached response",
          isNew,
        };
      }
      return {
        cached: false,
        isNew,
        response: waka,
        key,
      };
    } else {
      console.warn("Waka failed, will use cached.");
    }
  }

  return {
    cached: true,
    response: cached.attributes.response,
    isNew,
    key,
  };
}
