export enum PriorityEnum {
  LOW = 4,
  MEDIUM = 3,
  HIGH = 2,
  CRITICAL = 1,
}

export type WorkOrderType = {
  id: string;
  title: string;
  description?: string;
  dueDate: number;
  priority: PriorityEnum;
};

export type CreateWorkOrderType = {
  title: string | null;
  description: string | null;
  dueDate: string | null;
  priority: string | null;
};
