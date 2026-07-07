const pedidoRepository = require('../repository/pedido_repository');

exports.criarPedido = async (dados) => {
    if (!dados.clienteCpf || isNaN(dados.clienteCpf) || dados.clienteCpf.toString().length !== 9) {
        throw new Error("O CPF do cliente é obrigatório, deve ser numérico e possuir exatos 9 algarismos.");
    }
    if (!dados.clienteNome || dados.clienteNome.length < 5) {
        throw new Error("O nome do cliente é obrigatório e deve ter pelo menos 5 caracteres.");
    }
    if (!dados.produtoNome || dados.produtoNome.length < 5) {
        throw new Error("O nome do produto é obrigatório e deve ter pelo menos 5 caracteres.");
    }
    if (!dados.produtoPreco || typeof dados.produtoPreco !== 'number' || dados.produtoPreco <= 0) {
        throw new Error("O preço do produto é obrigatório e deve ser um número positivo.");
    }

    const novoPedido = {
        ...dados,
        dataHora: new Date(),
        situacao: "aberto"
    };

    return await pedidoRepository.salvar(novoPedido);
};

exports.listarPedidos = async (situacao) => {
    if (situacao && !["aberto", "pago", "finalizado"].includes(situacao)) {
        throw new Error("Situação inválida para filtro. Use 'aberto', 'pago' ou 'finalizado'.");
    }
    return await pedidoRepository.listar(situacao);
};

exports.consultarPedido = async (codigo) => {
    if (!codigo || isNaN(codigo)) {
        throw new Error("O código do pedido é obrigatório e deve ser um número.");
    }
    const pedido = await pedidoRepository.buscarPorId(codigo);
    if (!pedido) {
        throw new Error("Pedido não encontrado.");
    }
    return pedido;
};

exports.atualizarSituacao = async (codigo, situacao) => {
    if (!codigo || isNaN(codigo)) {
        throw new Error("O código do pedido é obrigatório e deve ser um número.");
    }
    if (!situacao || !["aberto", "pago", "finalizado"].includes(situacao)) {
        throw new Error("Situação obrigatória e deve ser 'aberto', 'pago' ou 'finalizado'.");
    }
    const pedidoAtualizado = await pedidoRepository.atualizarSituacao(codigo, situacao);
    if (!pedidoAtualizado) {
        throw new Error("Pedido não encontrado.");
    }
    return pedidoAtualizado;
};

exports.deletarPedido = async (codigo) => {
    if (!codigo || isNaN(codigo)) {
        throw new Error("O código do pedido é obrigatório e deve ser um número.");
    }
    const deletado = await pedidoRepository.deletar(codigo);
    if (!deletado) {
        throw new Error("Pedido não encontrado.");
    }
    return deletado;
};