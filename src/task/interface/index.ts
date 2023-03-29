export interface Task {
  id: string;
  name: string;
  complete: boolean;
  owner: string;
  duration: number;
  description: string;
}
