const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

let cartId;
let productId;

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const product = new Product({
    name: 'Test Product',
    price: 100,
    stock: 10,
  });

  await product.save();

  const cart = new Cart({
    items: [{ productId: product._id, quantity: 5 }],
  });

  await cart.save();

  cartId = cart._id.toString();
  productId = product._id.toString();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

test('should process the purchase and reduce stock', async () => {
  const res = await request(app)
    .post(`/carts/${cartId}/purchase`)
    .send();

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Compra procesada correctamente');

  const updatedProduct = await Product.findById(productId); // Ahora busca el producto por productId
  expect(updatedProduct.stock).toBe(5); // Verifica que el stock se haya reducido
});

test('should return failed products if stock is insufficient', async () => {
  const product = new Product({
    name: 'Another Product',
    price: 50,
    stock: 2,
  });

  await product.save();

  const cart = new Cart({
    items: [{ productId: product._id, quantity: 5 }],
  });

  await cart.save();

  const cartId = cart._id.toString();

  const res = await request(app)
    .post(`/carts/${cartId}/purchase`)
    .send();

  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Stock insuficiente');
  expect(res.body.failedProducts.length).toBe(1);

  expect(res.body.failedProducts[0].productId._id.toString()).toBe(product._id.toString());
});

jest.setTimeout(10000);
