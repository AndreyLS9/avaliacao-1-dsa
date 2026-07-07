let pedidos = [];
let proximoCodigo = 1;

exports.salvar = async (pedido) => {
    pedido.codigo = proximoCodigo++;
    pedidos.push(pedido);
    return pedido;
};

exports.listar = async (situacao) => {
    if (situacao) {
        return pedidos.filter(p => p.situacao === situacao);
    }
    return pedidos;
};

exports.buscarPorId = async (codigo) => {
    return pedidos.find(p => p.codigo === parseInt(codigo));
};

exports.atualizarSituacao = async (codigo, novaSituacao) => {
    const pedido = pedidos.find(p => p.codigo === parseInt(codigo));
    if (pedido) {
        pedido.situacao = novaSituacao;
    }
    return pedido;
};

exports.deletar = async (codigo) => {
    const index = pedidos.findIndex(p => p.codigo === parseInt(codigo));
    if (index !== -1) {
        pedidos.splice(index, 1);
        return true;
    }
    return false;
};