export enum Priority {
  LOW = 4,
  MEDIUM = 3,
  HIGH = 2,
  CRITICAL = 1,
}

export type WorkOrder = {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: Priority;
};

export type CreateWorkOrderType = {
  title: string;
  description: string | null;
  dueDate: string;
  priority: Priority;
};
