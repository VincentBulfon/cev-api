import { extendType } from "nexus";

export const createOption = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneOptions({
      type: "Option",
      description: "create one option",
    });
  },
});
