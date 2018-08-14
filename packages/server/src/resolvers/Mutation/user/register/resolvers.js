const bcrypt = require('bcryptjs');

const userResolver = {
  register: async (_, {name, email, password}, ctx, __) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await ctx.prisma.mutation.createUser({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return null;
  },
};

module.exports = {userResolver};
