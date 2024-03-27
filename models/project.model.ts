export interface IProject {
  title: string;
  slug: string;
  description: string;
  buttons: { title: string; path: string }[];
  tags: string[];
  badges: any[] | null;
  locale: string;
}
