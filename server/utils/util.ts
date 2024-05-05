import { Priority } from "../types.js";

export const validationPriorityEnum = (value: Priority) => {
  switch (value) {
    case Priority.LOW:
    case Priority.MEDIUM:
    case Priority.HIGH:
    case Priority.CRITICAL:
      return true;
    default:
      return false;
  }
};
