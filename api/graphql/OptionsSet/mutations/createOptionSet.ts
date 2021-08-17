import { extendType } from "nexus";

export const createOptionSet = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneOptions_set({
      type: "OptionSet",
      description: "create one option set",
    });
  },
});
