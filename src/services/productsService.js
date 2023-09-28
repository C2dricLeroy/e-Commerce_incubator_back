const Product = require('../models/Products')

class ProductsService {
    static async getProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(201).json(products);
        } catch (error){
            console.log(error.message);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits' });
        }
    }

    static async getTopProducts(req, res) {
        try {
            const products = await Products.findAll;
            res.status(201).json(products);
        } catch {
            console.log(error.message);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits' });
        }
    }

   defineTopProducts(products) {

    }
}

module.exports = ProductsService;