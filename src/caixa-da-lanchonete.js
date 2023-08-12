class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const listaItens = [
      {
        codigo: "cafe",
        descricao: "Café",
        valor: 3,
      },
      {
        codigo: "chantily",
        descricao: "Chantily (extra do café)",
        valor: 1.5,
      },
      {
        codigo: "suco",
        descricao: "Suco Natural",
        valor: 6.2,
      },
      {
        codigo: "sanduiche",
        descricao: "Sanduíche",
        valor: 6.5,
      },
      {
        codigo: "queijo",
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2,
      },
      {
        codigo: "salgado",
        descricao: "Salgado",
        valor: 7.25,
      },
      {
        codigo: "combo1",
        descricao: "1 Suco e 1 Sanduíche",
        valor: 9.5,
      },
      {
        codigo: "combo2",
        descricao: "1 Café e 1 Sanduíche",
        valor: 7.5,
      },
    ];

    const metodosDePagamento = [
      {
        metodo: "dinheiro",
        porcentagem: -0.05,
      },
      {
        metodo: "debito",
        porcentagem: 0,
      },
      {
        metodo: "credito",
        porcentagem: 0.03,
      },
    ];

    let totalValor = 0;

    let hasCafe = false;
    let hasSanduiche = false;
    let hasChantily = false;
    let hasQueijo = false;

    if (itens.length == 0) {
      return "Não há itens no carrinho de compra!";
    } else if (
      metodoDePagamento == "" ||
      !metodosDePagamento.find(
        (mtdPgmt) => mtdPgmt.metodo === metodoDePagamento
      )
    ) {
      return "Forma de pagamento inválida!";
    } else {
      for (const item of itens) {
        const [codigo, quantidade] = item.split(",");
        const itemInfo = listaItens.find((el) => el.codigo === codigo);

        if (quantidade <= 0) {
          return "Quantidade inválida!";
        }

        if (!itemInfo) {
          return "Item inválido!";
        } else {
          if (codigo === "cafe") {
            hasCafe = true;
          } else if (codigo === "sanduiche") {
            hasSanduiche = true;
          } else if (codigo === "chantily") {
            hasChantily = true;
          } else if (codigo === "queijo") {
            hasQueijo = true;
          }
          totalValor += itemInfo.valor * parseInt(quantidade);
        }
      }

      if ((hasChantily && !hasCafe) || (hasQueijo && !hasSanduiche)) {
        return "Item extra não pode ser pedido sem o principal";
      }

      return metodoDePagamento === "dinheiro"
        ? `R$ ${(totalValor - totalValor * 0.05).toFixed(2).replace(".", ",")}`
        : metodoDePagamento === "credito"
        ? `R$ ${(totalValor + totalValor * 0.03).toFixed(2).replace(".", ",")}`
        : `R$ ${totalValor.toFixed(2).replace(".", ",")}`;
    }
  }
}

export { CaixaDaLanchonete };
