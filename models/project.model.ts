import { Locale } from "@/locales/consts";
import { z } from "zod";

export const BadgeConfigSchema = z.object({
  type: z.enum(["languages", "total_time"]),
  source: z.enum(["wakapi", "static"]),
  project: z.string().optional(),
  label: z.string().optional(),
  value: z.string().optional(),
});

export type BadgeConfig = z.infer<typeof BadgeConfigSchema>;

export const getBadgeConfigKey = ({
  label,
  project,
}: {
  label?: string;
  project?: string;
}) => {
  if (project) {
    return `project-${project}`;
  } else if (label) {
    return `label-${label}`;
  } else {
    throw new Error("Invalid badge config");
  }
};

export interface IProject {
  title: string;
  slug: string;
  description: string;
  buttons: { title: string; path: string }[];
  tags: string[];
  badges: BadgeConfig[] | null;
  locale: Locale;
}
