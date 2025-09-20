const prisma = require('../prisma/prisma');
const { createAndThrowError } = require('../utils/utils');
class ProductService {
  static async getAll() {
    try {
      const products = await prisma.product.findMany();
      return products;
    } catch (error) {
      console.error(error);
      createAndThrowError(500, 'error', 'An internal server error has occurred');
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
}

module.exports = ProductService;