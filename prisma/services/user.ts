import prisma from "../index";

export const getUser = async (id: string) =>
  await prisma.user.findUnique({
    select: {
      email: true,
      first_name: true,
      last_name: true,
    },
    where: { id },
  });
