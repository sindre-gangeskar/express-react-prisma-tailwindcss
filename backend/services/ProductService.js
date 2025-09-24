const prisma = require('../prisma/prisma');
const { createAndThrowError } = require('../utils/utils');
class ProductService {
  static async getAll(page = 1, take = 8, setLimit = false) {
    try {
      page = Math.abs(page);
      page < 1 ? page = 1 : page;

      let hasNextPage = null;
      let nextPage = null;

      const totalPages = Math.ceil(await prisma.product.count() / +take);
      if (page > totalPages) page = totalPages;

      const offset = Math.ceil((page - 1) * +take);
      const products = await prisma.product.findMany((setLimit && page ? { skip: offset, take: take } : {}));

      if (setLimit && page) {
        hasNextPage = await prisma.product.count({ skip: offset, take: (+take + 1) }) > products.length;
        nextPage = hasNextPage ? page + 1 : null;
      }
      return { products, hasNextPage, nextPage, totalPages };
    } catch (error) {
      console.error(error);
      createAndThrowError(500, 'error', 'An internal server error has occurred');
    }
  }

  static async getRandom() {
    try {
      return await prisma.$transaction(async tx => {
        const count = await tx.product.count();
        const skip = Math.floor(Math.random() * count)
        const [ product ] = await tx.product.findMany({ take: 1, skip: skip, orderBy: { id: 'asc' }, include: { category: true } });
        return product
      })
    } catch (error) {
      console.error(error);
      createAndThrowError(500, 'error', 'An internal server error has occurred while trying to get random product');
    }
  }

  static async getById(id) {
    try {
      const product = await prisma.product.findUnique({ where: { id: +id }, include: { category: true } });
      if (!product) createAndThrowError(404, 'fail', 'Could not find product');
      return product;
    } catch (error) {
      if (error.status) throw error;
      createAndThrowError(500, 'error', 'An internal server error has occurred');
    }
  }

  static async search(keyword) {
    try {
      return await prisma.product.findMany({ where: { OR: [ { name: { contains: keyword } }, { category: { name: { contains: keyword } } } ] }, include: { category: true } })
    } catch (error) {
      console.error(error);
      createAndThrowError(500, 'error', 'An internal server error has occurred while trying to search for product');
    }
  }
}

module.exports = ProductService;