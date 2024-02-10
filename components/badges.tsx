import { getCachedBadgeData } from "@/lib/get-cached";
import { Badge as UiBadge } from "./ui/badge";
import { BadgeConfig, getBadgeConfigKey } from "@/models/project.model";

export type BadgeProps = {
  config: BadgeConfig;
  response: any;
};

export async function Badges(props: { badges: BadgeConfig[] }) {
  const requests = props.badges
    .filter((b) => b.source === "wakapi")
    .map((badge) => {
      return {
        label: badge.label,
        project: badge.project,
      };
    });

  // Keep only unique keys
  const uniqueRequests = requests.filter(
    (req, index) =>
      requests.findIndex(
        (r) => getBadgeConfigKey(r) === getBadgeConfigKey(req)
      ) === index
  );

  const responses = (
    await Promise.all(uniqueRequests.map((req) => getCachedBadgeData(req)))
  ).filter((res) => res && res.response && res.key);

  const wakapiBadges = props.badges
    .filter((b) => b.source === "wakapi")
    .map((badge, i) => {
      const foundResponse = responses.find(
        (r) => r!.key === getBadgeConfigKey(badge)
      );
      if (foundResponse) {
        return (
          /* @ts-expect-error Async Server Component */
          <Badge
            key={"wakapi" + i.toString()}
            config={badge}
            response={foundResponse.response}
          />
        );
      }
      return <UiBadge key={"error"}>Error</UiBadge>;
    });

  const staticBadges = props.badges
    .filter((b) => b.source === "static")
    .map((badge, i) => {
      return (
        <UiBadge key={"static" + i.toString()} variant={"secondary"}>
          {badge.value}
        </UiBadge>
      );
    });

  return (
    <div className="flex gap-1">
      {wakapiBadges} {staticBadges}
    </div>
  );
}

export async function Badge(props: BadgeProps) {
  if (props.config.type === "languages") {
    return (
      <UiBadge variant={"secondary"}>
        {props.response.data.languages
          .slice(0, 3)
          .map((lang: any) => lang.name)
          .join(", ")}
      </UiBadge>
    );
  }
  if (props.config.type === "total_time") {
    return (
      <UiBadge variant={"secondary"}>
        {props.response.data.human_readable_total}
      </UiBadge>
    );
  }
  return <></>;
}
