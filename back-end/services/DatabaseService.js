const prisma = require('../prisma/prisma');
const bcrypt = require('bcrypt');
class DatabaseService {
  static async seed() {
    try {
      const salt = bcrypt.genSaltSync(10);
      const password = 'testpassword';
      const hashedPassword = bcrypt.hashSync(password, salt);
      const response = await fetch('https://fakestoreapi.com/products');
      const products = new Map();
      let data;
      if (response.ok) {
        data = await response.json();
        console.log(data);

        if (data) {
          for (const item of data) {
            products.set({ name: item.title, description: item.description, category: item.category, image: item.image });
            const category = await prisma.category.upsert({ where: { name: item.category }, create: { name: item.category }, update: { name: item.category } })
            await prisma.product.upsert({ where: { name: item.title }, create: { name: item.title, description: item.description, img_url: item.image, categoryId: category.id }, update: {} });
          }
        }
        await prisma.user.upsert({ where: { username: 'admin' }, create: { username: 'admin', password: hashedPassword }, update: {} })
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DatabaseService;