import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.options_set.deleteMany();
  await prisma.prices.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.children.deleteMany();
  await prisma.options.deleteMany();
  await prisma.users.deleteMany();
  await prisma.cancellations.deleteMany();
  await prisma.courses.deleteMany();

  const users = await prisma.users.createMany({
    data: [
      {
        email: "vincent@prisma.io",
        name: "Bulfon",
        first_name: "Vincent",
        password: "root",
        role: "ADMIN",
        phone_number: "0456576787",
      },
      {
        email: "pierre@gmail.io",
        name: "Loma",
        first_name: "Pierre",
        password: "root",
        role: "MONITOR",
        phone_number: "0456986789",
      },
      {
        email: "alex@prisma.io",
        name: "Herlot",
        first_name: "Alex",
        password: "root",
        role: "USER",
        phone_number: "0456576780",
      },
      {
        email: "alice@prisma.io",
        name: "Koopers",
        first_name: "Alice",
        password: "root",
        role: "USER",
        phone_number: "044586825",
      },
    ],
  });

  console.log(`Users created`);

  const children = await prisma.users.update({
    where: { email: "alex@prisma.io" },
    data: {
      children: {
        createMany: {
          data: [
            {
              name: "Herlot",
              first_name: "Roger",
              birth_date: new Date(2011, 8, 13),
            },
            {
              name: "Herlot",
              first_name: "Alice",
              birth_date: new Date(2010, 1, 23),
            },
            {
              name: "Lemons",
              first_name: "Bobby",
              birth_date: new Date(2011, 5, 2),
            },
          ],
        },
      },
    },
  });

  console.log(`Children created`);

  const courses = await prisma.courses.createMany({
    data: [
      {
        day_of_week: 1,
        places: 16,
        start_time: new Date("1996-01-01T18:00:00"),
        end_time: new Date("1996-01-01T19:00:00"),
      },
      {
        day_of_week: 1,
        places: 16,
        start_time: new Date("1996-01-01T19:00:00"),
        end_time: new Date("1996-01-01T20:00:00"),
      },
      {
        day_of_week: 3,
        places: 16,
        start_time: new Date("1996-01-02T17:30:00"),
        end_time: new Date("1996-01-01T18:30:00"),
      },
      {
        day_of_week: 3,
        places: 16,
        start_time: new Date("1996-01-01T18:30:00"),
        end_time: new Date("1996-01-01T19:30:00"),
      },
      {
        day_of_week: 6,
        places: 16,
        start_time: new Date("1996-01-01T10:00:00"),
        end_time: new Date("1996-01-01T11:00:00"),
      },
      {
        day_of_week: 6,
        places: 16,
        start_time: new Date("1996-01-01T11:00:00"),
        end_time: new Date("1996-01-01T12:00:00"),
      },
      {
        day_of_week: 6,
        places: 16,
        start_time: new Date("1996-01-01T12:00:00"),
        end_time: new Date("1996-01-01T13:00:00"),
      },
    ],
  });

  console.log(`Courses created`);

  const childrenArray = await prisma.children.findMany();
  const selectedCourse = await prisma.courses.findMany();
  childrenArray.forEach(async (child, index) => {
    await prisma.children.update({
      where: { id: child.id },
      data: {
        courses: {
          connect: {
            id: selectedCourse[index].id,
          },
        },
      },
    });
  });

  const cancellations = await prisma.courses.update({
    where: { id: selectedCourse[1].id },
    data: {
      cancellations: {
        createMany: {
          data: [
            {
              date: new Date(2021, 9, 24),
            },
            {
              date: new Date(2021, 9, 17),
              deleted_at: new Date(Date.now()),
            },
          ],
        },
      },
    },
  });

  console.log(`Cancellations create`);

  const options = await prisma.options.createMany({
    data: [
      {
        name: "MEMBERSH1PFEE1",
      },
      {
        name: "MEMBERSHIPFEE2",
      },
      { name: "INSSURANCE" },
    ],
  });

  console.log(`Options created`);

  const allOptions = await prisma.options.findMany();

  const prices = await prisma.prices.createMany({
    data: [
      {
        price: 75,
        option_id: allOptions[0].id,
      },
      {
        price: 75,
        option_id: allOptions[1].id,
      },
      {
        price: 25,
        option_id: allOptions[2].id,
      },
    ],
  });

  console.log(`Prices created`);

  const optionsPrices = [
    await prisma.prices.findFirst({
      where: { option_id: allOptions[0].id },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    }),
    await prisma.prices.findFirst({
      where: { option_id: allOptions[1].id },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    }),
    await prisma.prices.findFirst({
      where: { option_id: allOptions[2].id },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    }),
  ];

  const childrenSelection = await prisma.users
    .findUnique({
      where: { email: "alex@prisma.io" },
    })
    .children();
  childrenSelection.forEach(async (child) => {
    await prisma.orders.create({
      data: {
        child: { connect: { id: child.id } },
        options_set: {
          create: [
            {
              price: {
                connect: { id: optionsPrices[0]?.id },
              },
              option: {
                connect: {
                  id: allOptions[0].id,
                },
              },
              status: "UNPAID",
            },
            {
              price: {
                connect: { id: optionsPrices[1]?.id },
              },
              option: {
                connect: {
                  id: allOptions[1].id,
                },
              },
              status: "PAID",
            },
            {
              price: {
                connect: { id: optionsPrices[2]?.id },
              },
              option: {
                connect: {
                  id: allOptions[2].id,
                },
              },
              status: "PAID",
            },
          ],
        },
      },
    });
  });
  console.log("Orders created");
  console.log("finished exit with ctr+c")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
