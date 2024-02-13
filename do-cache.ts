import { getCachedBadgeData } from "./lib/get-cached";

async function main() {
  console.log("Will use", process.env.API_URL);
  const response = await fetch(`${process.env.API_URL}/projects`, {
    headers: { Authorization: "Bearer " + process.env.API_KEY },
    cache: "no-store",
  }).then((res) => res.json());

  const labels: string[] = [];
  const projects: string[] = [];

  for (const project of response.data) {
    const wakapis = project.attributes.badges.filter(
      (b: any) => b.source === "wakapi"
    );

    for (const wakapi of wakapis) {
      if (wakapi.label && !labels.includes(wakapi.label)) {
        labels.push(wakapi.label);
      }
      if (wakapi.project && !projects.includes(wakapi.project)) {
        projects.push(wakapi.project);
      }
    }
  }

  console.log("Labels", labels);
  console.log("Projects", projects);

  for (const label of labels) {
    console.log("Label", label);
    await getCachedBadgeData({ label }, false);
  }
  for (const project of projects) {
    console.log("Project", project);
    await getCachedBadgeData({ project }, false);
  }
}

main().catch(console.error);
