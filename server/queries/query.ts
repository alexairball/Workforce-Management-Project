import { getAll } from "../database/_db.js";
import _ from "lodash";

export const Query = {
  getWorkOrders: async () => {
    const workOrders = await getAll(`SELECT * FROM work_order`);
    return _.chain(workOrders)
      .sort((a, b) => {
        // Compare by due date
        if (a.dueDate < b.dueDate) {
          return -1;
        } else if (
          new Date(a.dueDate).getTime() > new Date(b.dueDate).getTime()
        ) {
          return 1;
        } else {
          // If due dates are the same, compare by priority
          return a.priority - b.priority;
        }
      })
      .value();
  },
};
