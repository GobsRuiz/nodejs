const express = require("express");
const router = express.Router();



router.get('/', (req, res, next) => {
  res.status(200).send({
    message: "Usando GET produtos"
  });
})

router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto

  res.status(200).send({
    message: "Usando o GET de um produto existente",
    id: id,
  });
})

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };

  res.status(201).send({
    message: "Usando post produtos",
    product: product
  });
})



module.exports = router;