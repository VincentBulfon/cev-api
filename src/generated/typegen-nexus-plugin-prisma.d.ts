import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  Users: Prisma.Users
  Children: Prisma.Children
  Courses: Prisma.Courses
  Cancellations: Prisma.Cancellations
  Options: Prisma.Options
  Prices: Prisma.Prices
  Orders: Prisma.Orders
  Options_set: Prisma.Options_set
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'name' | 'password' | 'role' | 'deleted_at' | 'first_name' | 'phone_number' | 'secondary_email' | 'resetPasswordToken' | 'verfifed_at' | 'created_at' | 'children'
      ordering: 'id' | 'email' | 'name' | 'password' | 'role' | 'deleted_at' | 'first_name' | 'phone_number' | 'secondary_email' | 'resetPasswordToken' | 'verfifed_at' | 'created_at' | 'children'
    }
    children: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'birth_date' | 'first_name' | 'tutor_id' | 'tutor' | 'courses' | 'Orders'
      ordering: 'id' | 'name' | 'birth_date' | 'first_name' | 'tutor_id' | 'tutor' | 'courses' | 'Orders'
    }
    courses: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'places' | 'end_time' | 'start_time' | 'day_of_week' | 'cancellations' | 'children'
      ordering: 'id' | 'places' | 'end_time' | 'start_time' | 'day_of_week' | 'cancellations' | 'children'
    }
    cancellations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'date' | 'course_id' | 'created_at' | 'deleted_at' | 'course'
      ordering: 'id' | 'date' | 'course_id' | 'created_at' | 'deleted_at' | 'course'
    }
    options: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'created_at' | 'name' | 'orders' | 'Prices'
      ordering: 'id' | 'created_at' | 'name' | 'orders' | 'Prices'
    }
    prices: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'price' | 'created_at' | 'option_id' | 'option' | 'options_set'
      ordering: 'id' | 'price' | 'created_at' | 'option_id' | 'option' | 'options_set'
    }
    orders: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'cancelled_at' | 'created_at' | 'sport_voucher' | 'child_id' | 'child' | 'options_set'
      ordering: 'id' | 'cancelled_at' | 'created_at' | 'sport_voucher' | 'child_id' | 'child' | 'options_set'
    }
    optionsSets: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
      ordering: 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
    }
  },
  Users: {
    children: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'birth_date' | 'first_name' | 'tutor_id' | 'tutor' | 'courses' | 'Orders'
      ordering: 'id' | 'name' | 'birth_date' | 'first_name' | 'tutor_id' | 'tutor' | 'courses' | 'Orders'
    }
  }
  Children: {
    courses: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'places' | 'end_time' | 'start_time' | 'day_of_week' | 'cancellations' | 'children'
      ordering: 'id' | 'places' | 'end_time' | 'start_time' | 'day_of_week' | 'cancellations' | 'children'
    }
    Orders: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'cancelled_at' | 'created_at' | 'sport_voucher' | 'child_id' | 'child' | 'options_set'
      ordering: 'id' | 'cancelled_at' | 'created_at' | 'sport_voucher' | 'child_id' | 'child' | 'options_set'
    }
  }
  Courses: {
    cancellations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'date' | 'course_id' | 'created_at' | 'deleted_at' | 'course'
      ordering: 'id' | 'date' | 'course_id' | 'created_at' | 'deleted_at' | 'course'
    }
    children: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'birth_date' | 'first_name' | 'tutor_id' | 'tutor' | 'courses' | 'Orders'
      ordering: 'id' | 'name' | 'birth_date' | 'first_name' | 'tutor_id' | 'tutor' | 'courses' | 'Orders'
    }
  }
  Cancellations: {

  }
  Options: {
    orders: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
      ordering: 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
    }
    Prices: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'price' | 'created_at' | 'option_id' | 'option' | 'options_set'
      ordering: 'id' | 'price' | 'created_at' | 'option_id' | 'option' | 'options_set'
    }
  }
  Prices: {
    options_set: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
      ordering: 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
    }
  }
  Orders: {
    options_set: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
      ordering: 'id' | 'status' | 'paid_at' | 'cancelled_at' | 'option_id' | 'order_id' | 'price_id' | 'option' | 'order' | 'price'
    }
  }
  Options_set: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    users: 'Users'
    users: 'Users'
    children: 'Children'
    children: 'Children'
    courses: 'Courses'
    courses: 'Courses'
    cancellations: 'Cancellations'
    cancellations: 'Cancellations'
    options: 'Options'
    options: 'Options'
    prices: 'Prices'
    prices: 'Prices'
    orders: 'Orders'
    orders: 'Orders'
    optionsSet: 'Options_set'
    optionsSets: 'Options_set'
  },
  Mutation: {
    createOneUsers: 'Users'
    updateOneUsers: 'Users'
    updateManyUsers: 'AffectedRowsOutput'
    deleteOneUsers: 'Users'
    deleteManyUsers: 'AffectedRowsOutput'
    upsertOneUsers: 'Users'
    createOneChildren: 'Children'
    updateOneChildren: 'Children'
    updateManyChildren: 'AffectedRowsOutput'
    deleteOneChildren: 'Children'
    deleteManyChildren: 'AffectedRowsOutput'
    upsertOneChildren: 'Children'
    createOneCourses: 'Courses'
    updateOneCourses: 'Courses'
    updateManyCourses: 'AffectedRowsOutput'
    deleteOneCourses: 'Courses'
    deleteManyCourses: 'AffectedRowsOutput'
    upsertOneCourses: 'Courses'
    createOneCancellations: 'Cancellations'
    updateOneCancellations: 'Cancellations'
    updateManyCancellations: 'AffectedRowsOutput'
    deleteOneCancellations: 'Cancellations'
    deleteManyCancellations: 'AffectedRowsOutput'
    upsertOneCancellations: 'Cancellations'
    createOneOptions: 'Options'
    updateOneOptions: 'Options'
    updateManyOptions: 'AffectedRowsOutput'
    deleteOneOptions: 'Options'
    deleteManyOptions: 'AffectedRowsOutput'
    upsertOneOptions: 'Options'
    createOnePrices: 'Prices'
    updateOnePrices: 'Prices'
    updateManyPrices: 'AffectedRowsOutput'
    deleteOnePrices: 'Prices'
    deleteManyPrices: 'AffectedRowsOutput'
    upsertOnePrices: 'Prices'
    createOneOrders: 'Orders'
    updateOneOrders: 'Orders'
    updateManyOrders: 'AffectedRowsOutput'
    deleteOneOrders: 'Orders'
    deleteManyOrders: 'AffectedRowsOutput'
    upsertOneOrders: 'Orders'
    createOneOptions_set: 'Options_set'
    updateOneOptions_set: 'Options_set'
    updateManyOptions_set: 'AffectedRowsOutput'
    deleteOneOptions_set: 'Options_set'
    deleteManyOptions_set: 'AffectedRowsOutput'
    upsertOneOptions_set: 'Options_set'
  },
  Users: {
    id: 'Int'
    email: 'String'
    name: 'String'
    password: 'String'
    role: 'RoleEnum'
    deleted_at: 'DateTime'
    first_name: 'String'
    phone_number: 'String'
    secondary_email: 'String'
    resetPasswordToken: 'String'
    verfifed_at: 'DateTime'
    created_at: 'DateTime'
    children: 'Children'
  }
  Children: {
    id: 'Int'
    name: 'String'
    birth_date: 'DateTime'
    first_name: 'String'
    tutor_id: 'Int'
    tutor: 'Users'
    courses: 'Courses'
    Orders: 'Orders'
  }
  Courses: {
    id: 'Int'
    places: 'Int'
    end_time: 'DateTime'
    start_time: 'DateTime'
    day_of_week: 'Int'
    cancellations: 'Cancellations'
    children: 'Children'
  }
  Cancellations: {
    id: 'Int'
    date: 'DateTime'
    course_id: 'Int'
    created_at: 'DateTime'
    deleted_at: 'DateTime'
    course: 'Courses'
  }
  Options: {
    id: 'Int'
    created_at: 'DateTime'
    name: 'NameEnum'
    orders: 'Options_set'
    Prices: 'Prices'
  }
  Prices: {
    id: 'Int'
    price: 'Int'
    created_at: 'DateTime'
    option_id: 'Int'
    option: 'Options'
    options_set: 'Options_set'
  }
  Orders: {
    id: 'Int'
    cancelled_at: 'DateTime'
    created_at: 'DateTime'
    sport_voucher: 'Boolean'
    child_id: 'Int'
    child: 'Children'
    options_set: 'Options_set'
  }
  Options_set: {
    id: 'Int'
    status: 'StatusEnum'
    paid_at: 'DateTime'
    cancelled_at: 'DateTime'
    option_id: 'Int'
    order_id: 'Int'
    price_id: 'Int'
    option: 'Options'
    order: 'Orders'
    price: 'Prices'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Users: Typegen.NexusPrismaFields<'Users'>
  Children: Typegen.NexusPrismaFields<'Children'>
  Courses: Typegen.NexusPrismaFields<'Courses'>
  Cancellations: Typegen.NexusPrismaFields<'Cancellations'>
  Options: Typegen.NexusPrismaFields<'Options'>
  Prices: Typegen.NexusPrismaFields<'Prices'>
  Orders: Typegen.NexusPrismaFields<'Orders'>
  Options_set: Typegen.NexusPrismaFields<'Options_set'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  