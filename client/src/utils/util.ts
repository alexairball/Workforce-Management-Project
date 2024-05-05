import { isBefore, isValid } from "date-fns";
import { CreateWorkOrderType, PriorityEnum } from "../types";
import _ from "lodash";

export const isValidPriorityEnum = (value: string) => {
  const _value = +value;
  switch (_value) {
    case PriorityEnum.LOW:
    case PriorityEnum.MEDIUM:
    case PriorityEnum.HIGH:
    case PriorityEnum.CRITICAL:
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
  if (_.isNil(workOrder.priority) || !isValidPriorityEnum(workOrder.priority))
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
