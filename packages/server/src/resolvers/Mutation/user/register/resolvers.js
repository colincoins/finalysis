const bcrypt = require('bcryptjs');

const userResolver = {
  register: async (_, {email, password}, ctx, __) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await ctx.prisma.mutation.createUser({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return null;
  },
};

module.exports = {userResolver};
