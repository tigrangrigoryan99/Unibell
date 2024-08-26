export interface ISounds {
  count: number;
  next: string;
  previous: string | null;
  results: IResults[];
}

export interface IResults {
  id: number;
  name: string;
  previews: IPreviews;
}

export interface IPreviews {
  [key: string]: string;
}
