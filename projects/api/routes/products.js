const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;



// Select
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error) return res.status(500).send({error: error})

    conn.query(
      "SELECT * FROM products",
      (error, result, field) => {
        conn.release();

        if(error) return res.status(500).send({error: error, response: null})

        res.status(200).send({
          response: result
        })
      }
    )
  })
})

// Insert
router.post('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({error: error})

    conn.query(
      "INSERT INTO products (name, price) VALUES (?,?)",
      [req.body.name, req.body.price],
      (error, result, field) => {
        conn.release();

        if(error) return res.status(500).send({error: error, response: null})

        res.status(201).send({
          message: "Produto cadastrado com sucesso",
        });
      }
    )
  })
})

router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto

  res.status(200).send({
    message: "Usando o GET de um produto existente",
    id: id,
  });
})



module.exports = router;