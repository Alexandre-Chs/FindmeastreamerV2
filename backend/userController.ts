import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (data: {
  name: string;
  email: string;
}): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });

  return user;
};

export default createUser;
