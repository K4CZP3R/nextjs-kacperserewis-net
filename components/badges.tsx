import { Badge as UiBadge } from "./ui/badge";
import { BadgeConfig, getBadgeConfigKey } from "@/models/project.model";

export type BadgeProps = {
  config: BadgeConfig;
  response: any;
};

async function getStaticBadges(badges: BadgeConfig[]) {
  const staticBadges = badges
    .filter((b) => b.source === "static")
    .map((badge, i) => {
      return (
        <UiBadge key={"static" + i.toString()} variant={"secondary"}>
          {badge.value}
        </UiBadge>
      );
    });

  return staticBadges;
}

export async function Badges(props: { badges: BadgeConfig[] }) {
  const staticBadges = await getStaticBadges(props.badges);
  return <div className="flex gap-1">{staticBadges}</div>;
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
