import { v4 as uuidv4 } from "uuid";
import {
  formatField,
  validateField,
  validationPriorityEnum,
} from "../utils/util.js";
import { insertData } from "../database/_db.js";

export const Mutation = {
  addWorkOrder: async (_parent, { newOrder }) => {
    const error = validateField(newOrder);
    if (error) throw Error(error);
    const { title, description, dueDate, priority } = formatField(newOrder);
    const id = await insertData(
      `INSERT INTO work_order (title, description, dueDate, priority) VALUES (?, ?, ?, ?) RETURNING id`,
      [title, description, dueDate, priority]
    );
    return {
      id,
      title,
      description,
      dueDate,
      priority,
    };
  },
};
