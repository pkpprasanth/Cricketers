export interface Cricketer {
  id: string;
  name: string;
  description: string;
  type: string;
  points: number;
  rank: number;
  dob: any;
}

export interface CricketerDetailsProps {
  cricketers: Cricketer[];
}
