import { extendType } from "nexus";

export const deleteOption = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.deleteOneOptions({
      type: "Option",
      description: "delete one option",
    });
  },
});
