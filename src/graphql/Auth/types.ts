import { inputObjectType, objectType } from "nexus";

export const messagePayload = objectType({
  name: "MessagePayload",
  definition(t) {
    t.nonNull.string("message");
  },
});

export const loginInput = inputObjectType({
  name: "loginInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token"), t.nonNull.string("userEmail");
  },
});

export const resetPasswordInput = inputObjectType({
  name: "resetPasswordInput",
  definition(t) {
    t.nonNull.string("resetPasswordToken");
    t.nonNull.string("newPassword");
  },
});
