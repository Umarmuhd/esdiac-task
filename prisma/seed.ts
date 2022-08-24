import { hashPassword } from "../src/utils/passwordUtils";
import prisma from "./index";

const run = async () => {
  const hashedPassword = await hashPassword("password");
  await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: hashedPassword,
      first_name: "Scott",
      last_name: "Moss",
      phone_number: "1234567890",
      country_code: "234",
    },
  });
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
