const express = require('express');
const pedidoService = require('./service/pedido_service');

const app = express();
app.use(express.json());

app.post('/pedidos', async (req, res) => {
    try {
        const novoPedido = await pedidoService.criarPedido(req.body);
        res.status(201).json(novoPedido);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});
s
app.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await pedidoService.listarPedidos(req.query.situacao);
        res.status(200).json(pedidos);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

app.get('/pedidos/:id', async (req, res) => {
    try {
        const pedido = await pedidoService.consultarPedido(req.params.id);
        res.status(200).json(pedido);
    } catch (erro) {
        res.status(404).json({ erro: erro.message });
    }
});

app.patch('/pedidos/:id/situacao', async (req, res) => {
    try {
        const pedido = await pedidoService.atualizarSituacao(req.params.id, req.body.situacao);
        res.status(200).json(pedido);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

app.delete('/pedidos/:id', async (req, res) => {
    try {
        await pedidoService.deletarPedido(req.params.id);
        res.status(204).send();
    } catch (erro) {
        res.status(404).json({ erro: erro.message });
    }
});

module.exports = app;