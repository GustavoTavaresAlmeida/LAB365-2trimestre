const vendas = [
    { produto: "Notebook", valor: 2500 },
    { produto: "Monitor", valor: 1200 },
    { produto: "Teclado", valor: 250 }
];

let totalVendas = 0;

vendas.forEach(venda => {
    console.log(`Produto: ${venda.produto}, Valor: R$ ${venda.valor}`);
    totalVendas += venda.valor;
});

console.log(`Total de vendas: R$ ${totalVendas}`);