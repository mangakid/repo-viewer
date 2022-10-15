export type Repo = {
  name: string;
  stars: number;
  forks: number;
  url: string;
  id: string;
};

export interface ReposData {
  search: {
    repos: {
      id: string;
      name: string;
      forks: number;
      stars: number;
      url: string;
    }[];
  };
}
