export type MediaType = "anime" | "manga";

export interface Item {
  id: number;
  title: string;
  type: MediaType;
  rating: number;
  image: string;
  status: "completed" | "ongoing" | "upcoming";
  description: string;
}
