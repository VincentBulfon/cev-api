import { join } from "path";
import { makeSchema } from "nexus";
import * as gqlTypes from "./graphql";
import { nexusPrisma } from "nexus-plugin-prisma";
import { DateScalar } from "./graphql/scalars";

const graphqlSchema = makeSchema({
  types: [gqlTypes, DateScalar],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "shema.graphql"),
  },
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  contextType: {
    module: join(__dirname, "./context.ts"),
    alias: "ContextModule",
    export: "Context",
  },
});

export default graphqlSchema;
