const dadosPessoais = { nome: "Lucas", idade: 30 };
const endereco = { cidade: "São Paulo", estado: "SP" };

const pessoaCompleta = { ...dadosPessoais, ...endereco };
console.log("Dados completos:");
console.log(pessoaCompleta);