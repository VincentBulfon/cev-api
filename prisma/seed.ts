import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.children.deleteMany();
  await prisma.prices.deleteMany();
  await prisma.options_set.deleteMany();
  await prisma.orders.deleteMany();
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
        phone_number: "00121212",
      },
      {
        email: "pierre@gmail.io",
        name: "Loma",
        first_name: "Pierre",
        password: "root",
        role: "MONITOR",
        phone_number: "00121212",
      },
      {
        email: "alex@prisma.io",
        name: "Herlot",
        first_name: "Alex",
        password: "root",
        role: "USER",
        phone_number: "00121212",
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

  const course = await prisma.courses.createMany({
    data: [
      {
        day_of_week: 0,
        places: 16,
        start_time: new Date("1996-01-01T18:00:00"),
        end_time: new Date("1996-01-01T19:00:00"),
      },
      {
        day_of_week: 0,
        places: 16,
        start_time: new Date("1996-01-01T19:00:00"),
        end_time: new Date("1996-01-01T20:00:00"),
      },
      {
        day_of_week: 2,
        places: 16,
        start_time: new Date("1996-01-02T17:30:00"),
        end_time: new Date("1996-01-01T18:30:00"),
      },
      {
        day_of_week: 2,
        places: 16,
        start_time: new Date("1996-01-01T18:30:00"),
        end_time: new Date("1996-01-01T19:30:00"),
      },
      {
        day_of_week: 5,
        places: 16,
        start_time: new Date("1996-01-01T10:00:00"),
        end_time: new Date("1996-01-01T11:00:00"),
      },
      {
        day_of_week: 5,
        places: 16,
        start_time: new Date("1996-01-01T11:00:00"),
        end_time: new Date("1996-01-01T12:00:00"),
      },
      {
        day_of_week: 5,
        places: 16,
        start_time: new Date("1996-01-01T12:00:00"),
        end_time: new Date("1996-01-01T13:00:00"),
      },
    ],
  });

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
              date: new Date(2021, 9, 20),
            },
            {
              date: new Date(2021, 9, 27),
              deleted_at: new Date(Date.now()),
            },
          ],
        },
      },
    },
  });

  const options = await prisma.options.createMany({
    data: [
      {
        name: "cotisation 1",
      },
      {
        name: "cotisation 2",
      },
      { name: "assurance" },
    ],
  });

  const allOptions = await prisma.options.findMany();

  const prices = await prisma.prices.createMany({
    data: [
      {
        price: 75,
        options_id: allOptions[0].id,
      },
      {
        price: 75,
        options_id: allOptions[1].id,
      },
      {
        price: 25,
        options_id: allOptions[2].id,
      },
    ],
  });

  console.log(options, prices);

  const optionsPrices = [
    await prisma.prices.findFirst({
      where: { options_id: allOptions[0].id },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    }),
    await prisma.prices.findFirst({
      where: { options_id: allOptions[1].id },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    }),
    await prisma.prices.findFirst({
      where: { options_id: allOptions[2].id },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    }),
  ];

  const orders = await prisma.orders.create({
    data: {
      users: { connect: { email: "alex@prisma.io" } },
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
          {
            price: {
              connect: { id: optionsPrices[0]?.id },
            },
            option: {
              connect: {
                id: allOptions[0].id,
              },
            },
            status: "NOTYETPAYABLE",
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
          {
            price: {
              connect: { id: optionsPrices[0]?.id },
            },
            option: {
              connect: {
                id: allOptions[0].id,
              },
            },
            status: "NOTAPPLICABLE",
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
            status: "UNPAID",
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
            status: "UNPAID",
          },
        ],
      },
    },
  });

  console.log(orders);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
