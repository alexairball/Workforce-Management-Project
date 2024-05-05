import _ from "lodash";
import { CreateWorkOrderType, Priority } from "../types.js";
import { isBefore, isValid } from "date-fns";

export const validationPriorityEnum = (value: Priority) => {
  const _value = +value;
  switch (_value) {
    case Priority.LOW:
    case Priority.MEDIUM:
    case Priority.HIGH:
    case Priority.CRITICAL:
      return true;
    default:
      return false;
  }
};

export const validateField = (workOrder: CreateWorkOrderType) => {
  if (_.isNil(workOrder.title) || workOrder.title.trim().length === 0)
    return "Missing tittle";
  if (
    _.isNil(workOrder.dueDate) ||
    !isValid(new Date(workOrder.dueDate)) ||
    isBefore(
      new Date(workOrder.dueDate!).toISOString(),
      new Date(new Date().toISOString().split("T")[0]).toISOString()
    )
  )
    return "Missing due date or invalid input. Date must be at least today.";
  if (
    _.isNil(workOrder.priority) ||
    !validationPriorityEnum(workOrder.priority)
  )
    return "Missing priority or invalid input";
};

export const formatField = (workOrder: CreateWorkOrderType) => {
  return {
    title: workOrder.title,
    description: workOrder.description,
    dueDate: new Date(workOrder.dueDate!).toISOString(),
    priority: +workOrder.priority!,
  };
};
