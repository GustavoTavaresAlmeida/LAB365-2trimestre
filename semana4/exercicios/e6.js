const contador = {
    valor: 0,
    
    incrementar() {
        this.valor += 1;
    },
    
    decrementar() {
        this.valor -= 1;
    },
    
    mostrarValor() {
        console.log(`O valor atual é ${this.valor}`);
    }
};

contador.mostrarValor();
contador.incrementar();
contador.incrementar();
contador.mostrarValor();
contador.decrementar();
contador.mostrarValor();