import { extendType } from "nexus";

export const optionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.options({
      type: "Option",
      filtering: true,
      description: "get options",
    });
  },
});
