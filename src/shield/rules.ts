import { rule } from "graphql-shield";
import { Context } from "../context";
import { getUserEmail } from "../ultils/getUserEmail";

export const rules = {
  isAuthenticatedUser: rule()((_parent, _args, ctx: Context) => {
    const userEmail = getUserEmail(ctx);
    return Boolean(userEmail);
  }),
  isAdmin: rule()(async (_parent, _args, ctx: Context) => {
    const userEmail = getUserEmail(ctx);
    const user = await ctx.prisma.users.findMany({
      where: {
        AND: [{ email: { equals: userEmail } }, { role: { equals: "ADMIN" } }],
      },
      take: 1,
    });
    const isAdmin = !!user;
    return isAdmin;
  }),
  isMonitor: rule()(async (_parent, _args, ctx: Context) => {
    const userEmail = getUserEmail(ctx);
    const user = await ctx.prisma.users.findMany({
      where: {
        AND: [
          { email: { equals: userEmail } },
          { role: { equals: "MONITOR" } },
        ],
      },
    });
    const isMonitor = !!user;
    return isMonitor;
  }),
  isNormalUser: rule()(async (_parent, _args, ctx: Context) => {
    const userEmail = getUserEmail(ctx);
    const user = await ctx.prisma.users.findMany({
      where: {
        AND: [
          { email: { equals: userEmail } },
          { role: { equals: "MONITOR" } },
        ],
      },
    });
    const isNormalUser = !!user;
    return isNormalUser;
  }),
};
