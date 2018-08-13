const userQuery = {
  user: (_, { id }, ctx, __) => {
    return ctx.prisma.query.user({ 
      where: {
        id
      }
    })
  }
}

module.exports = { userQuery }