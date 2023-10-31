
// função de remover item do carrinho
const botaoRemoverProduto = document.getElementsByClassName("botao-remover")

for( var i = 0; i < botaoRemoverProduto.length; i++) {
    botaoRemoverProduto[i].addEventListener("click", function(event) {
        event.target.parentElement.parentElement.remove()
        atualizaTotal()
    })
}

// atualizar preço total do carrinho ao remover produto

function atualizaTotal() {

    let valorTotal = 0
    const produtosNoCarrinho = document.getElementsByClassName("produto-carrinho")


    for( var i = 0; i < produtosNoCarrinho.length; i++) {
        const preco = produtosNoCarrinho[i].getElementsByClassName("preco-produto")[0].innerText.replace("R$", "").replace(",", ".")

        const quantidade = produtosNoCarrinho[i].getElementsByClassName("quantidade-input")[0].value

        valorTotal += preco * quantidade
        
    }
    valorTotal = valorTotal.toFixed(2).replace(".", ",")

    document.querySelector(".total-container span").innerText = "R$ " + valorTotal

}

