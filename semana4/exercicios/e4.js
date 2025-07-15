const dados = { nome: "João", idade: null, cidade: "São Paulo", email: undefined };

const dadosLimpos = Object.fromEntries(
    Object.entries(dados).filter(([key, value]) => value !== null && value !== undefined)
);

console.log("Dados limpos:");
console.log(dadosLimpos);