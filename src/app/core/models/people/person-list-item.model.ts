import { IKnownForItem } from "./known-for-item.model";

export interface IPersonListItem {
    id: number;
    name: string;
    profile_path: string | null;
    known_for_department: string;
    popularity: number;
    known_for: IKnownForItem[];
  }