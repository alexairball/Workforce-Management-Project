import { v4 as uuidv4 } from "uuid";
import { validationPriorityEnum } from "../utils/util.js";
import { insertData } from "../database/_db.js";

export const Mutation = {
  addWorkOrder: async (_parent, { newOrder }) => {
    const { title, description, dueDate, priority } = newOrder;
    if (!validationPriorityEnum(priority))
      throw Error(`Invalid priority value ${priority}`);
    await insertData(
      `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
      [title, description, dueDate, priority]
    );
    return {
      id: uuidv4(),
      title,
      description,
      dueDate,
      priority,
    };
  },
};
