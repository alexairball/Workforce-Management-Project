import { GraphQLEnumType } from "graphql";

export const PriorityEnum = new GraphQLEnumType({
  name: "Priority",
  description: "Priority level enum type",
  values: {
    LOW: { value: 4 },
    MEDIUM: { value: 3 },
    HIGH: { value: 2 },
    CRITICAL: { value: 1 },
  },
});
