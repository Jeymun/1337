const express = require('express');
const passport = require('passport');
const { isAdmin } = require('../middleware/authorization');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.post('/products', passport.authenticate('jwt', { session: false }), isAdmin, ProductController.createProduct);
router.put('/products/:id', passport.authenticate('jwt', { session: false }), isAdmin, ProductController.updateProduct);
router.delete('/products/:id', passport.authenticate('jwt', { session: false }), isAdmin, ProductController.deleteProduct);

module.exports = router;
