export interface IPost {
  title: string;
  description: string;
  contentFile: string;
  content?: string;
  tags: string[];
  images: any;
  createdAt: string;
  updatedAt: string;
}
