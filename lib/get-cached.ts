"use server";

import { getBadgeConfigKey } from "@/models/project.model";

export async function getCachedBadgeData({
  label,
  project,
}: {
  label?: string;
  project?: string;
}) {
  const key = getBadgeConfigKey({ label, project });

  const cachedResponse = await fetch(
    `${process.env.API_URL}/cached-responses?filters[key][$eq]=${key}`,
    { headers: { Authorization: "Bearer " + process.env.API_KEY } }
  );

  if (!cachedResponse.ok) {
    console.error("Error fetching cached response", cachedResponse);
    return null;
  }

  const cached = (await cachedResponse.json()).data.find(
    (d: any) => d.attributes.key === key
  );

  const isNew = !cached;
  const secondsOld = cached
    ? (new Date().getTime() - new Date(cached.attributes.updatedAt).getTime()) /
      1000
    : 0;

  if (!cached || secondsOld > 86400) {
    console.log(
      key,
      "is not cached or is older than 24 hours",
      isNew,
      secondsOld,
      cached ? cached.attributes.updatedAt : ""
    );
    const waka = await fetch(
      `${
        process.env.WAKAPI_URL
      }/api/compat/wakatime/v1/users/kacper/stats/all_time?${
        label ? `label=${label}` : project ? `project=${project}` : ""
      }`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json());

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
  }

  return {
    cached: true,
    response: cached.attributes.response,
    isNew,
    key,
  };
}
