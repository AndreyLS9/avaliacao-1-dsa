const pedidos = [];
let proximoPedido = 1;

const incluir = async (pedido) => {
    pedido.codigo = proximoPedido++;
    pedidos.push(pedido);
    return pedido;
};

const listarTodos = async (situacao) => {
    return situacao ? pedidos.filter(p => p.situacao === situacao) : pedidos;
};

const buscarPorId = async (codigo) => {
    return pedidos.find(p => p.codigo === codigo);
};

const atualizarSituacao = async (codigo, situacao) => {
    const pedido = await buscarPorId(codigo);
    if (pedido) pedido.situacao = situacao;
    return pedido;
};

const deletar = async (codigo) => {
    const index = pedidos.findIndex(p => p.codigo === codigo);
    return index !== -1 ? pedidos.splice(index, 1)[0] : null;
};

module.exports = {
    incluir,
    listarTodos,
    buscarPorId,
    atualizarSituacao,
    deletar
};