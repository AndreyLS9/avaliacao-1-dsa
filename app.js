const express = require('express');
const pedidoService = require('./service/pedido_service');

const app = express();
app.use(express.json());

app.post('/pedidos', (req, res) => {
    try {
        res.status(201).json(pedidoService.incluirPedido(req.body));
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

app.get('/pedidos', (req, res) => {
    try {
        res.status(200).json(pedidoService.listarPedidos(req.query.situacao));
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

app.get('/pedidos/:codigo', (req, res) => {
    try {
        res.status(200).json(pedidoService.consultarPedido(req.params.codigo));
    } catch (error) {
        res.status(error.message.includes("encontrado") ? 404 : 400).json({ erro: error.message });
    }
});

app.patch('/pedidos/:codigo/situacao', (req, res) => {
    try {
        res.status(200).json(pedidoService.atualizarSituacao(req.params.codigo, req.body.situacao));
    } catch (error) {
        res.status(error.message.includes("encontrado") ? 404 : 400).json({ erro: error.message });
    }
});

app.delete('/pedidos/:codigo', (req, res) => {
    try {
        pedidoService.deletarPedido(req.params.codigo);
        res.status(204).send();
    } catch (error) {
        res.status(error.message.includes("encontrado") ? 404 : 400).json({ erro: error.message });
    }
});

module.exports = app;