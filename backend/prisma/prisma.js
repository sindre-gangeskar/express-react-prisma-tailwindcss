const { PrismaClient } = require('../.prisma/client.js');

const prisma = new PrismaClient({ log: [ 'query' ] });
prisma.$connect().then(() => { console.log('Connected to database') }).catch((err) => { console.error('Failed to connect to database - please check connection', err) });
module.exports = prisma;