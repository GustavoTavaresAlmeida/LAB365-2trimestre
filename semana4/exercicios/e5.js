function filtrarDinamico(lista, propriedades, valores) {
    return lista.filter(item => {
        return propriedades.every((prop, index) => item[prop] === valores[index]);
    });
}

const listaExemplo = [
    { nome: "Ana", idade: 25, cidade: "São Paulo" },
    { nome: "João", idade: 30, cidade: "Rio de Janeiro" },
    { nome: "Maria", idade: 25, cidade: "São Paulo" },
    { nome: "Pedro", idade: 35, cidade: "São Paulo" }
];

const resultado = filtrarDinamico(listaExemplo, ["idade", "cidade"], [25, "São Paulo"]);
console.log("Resultado do filtro dinâmico:");
console.log(resultado);