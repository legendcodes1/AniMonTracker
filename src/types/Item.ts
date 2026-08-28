export interface Item {
  id: string | number;
  title: string;
  type: "anime" | "manga";
  rating?: number;
  image: string;
  status: string;
  description?: string;
  genre?: string;
  episodes?: number;
  chapters?: number;
}
