const pedidoRepository = require('./repository/pedido_repository');

const incluirPedido = (dados) => {
    const { clienteCpf, clienteNome, produtoNome, produtoPreco } = dados;

    if (!clienteCpf || !/^\d{9}$/.test(clienteCpf)) throw new Error("CPF obrigatório, numérico e com 9 algarismos.");
    if (!clienteNome || clienteNome.length < 5) throw new Error("Nome obrigatório e mínimo de 5 caracteres.");
    if (!produtoNome || produtoNome.length < 5) throw new Error("Produto obrigatório e mínimo de 5 caracteres.");
    if (typeof produtoPreco !== 'number' || produtoPreco <= 0) throw new Error("Preço obrigatório e deve ser positivo.");

    return pedidoRepository.incluir({
        dataHora: new Date(),
        clienteCpf,
        clienteNome,
        produtoNome,
        produtoPreco,
        situacao: "aberto"
    });
};

const listarPedidos = (situacao) => {
    if (situacao && !["aberto", "pago", "finalizado"].includes(situacao)) {
        throw new Error("Situação inválida.");
    }

    return pedidoRepository.listarTodos(situacao).map(p => ({
        codigo: p.codigo,
        dataHora: p.dataHora,
        clienteNome: p.clienteNome,
        produtoNome: p.produtoNome,
        situacao: p.situacao,
        valorTotal: p.produtoPreco
    }));
};

const consultarPedido = (codigoStr) => {
    const codigo = Number(codigoStr);
    if (!codigo) throw new Error("Código inválido.");

    const pedido = pedidoRepository.buscarPorId(codigo);
    if (!pedido) throw new Error("Pedido não encontrado.");

    return {
        codigo: pedido.codigo,
        dataHora: pedido.dataHora,
        clienteCPF: pedido.clienteCpf,
        clienteNome: pedido.clienteNome,
        produtoNome: pedido.produtoNome,
        situacao: pedido.situacao,
        valorTotal: pedido.produtoPreco
    };
};

const atualizarSituacao = (codigoStr, situacao) => {
    const codigo = Number(codigoStr);
    if (!codigo) throw new Error("Código inválido.");
    if (!["aberto", "pago", "finalizado"].includes(situacao)) throw new Error("Situação inválida.");

    const pedido = pedidoRepository.atualizarSituacao(codigo, situacao);
    if (!pedido) throw new Error("Pedido não encontrado.");

    return pedido;
};

const deletarPedido = (codigoStr) => {
    const codigo = Number(codigoStr);
    if (!codigo) throw new Error("Código inválido.");

    const deletado = pedidoRepository.deletar(codigo);
    if (!deletado) throw new Error("Pedido não encontrado.");

    return deletado;
};

module.exports = {
    incluirPedido,
    listarPedidos,
    consultarPedido,
    atualizarSituacao,
    deletarPedido
};