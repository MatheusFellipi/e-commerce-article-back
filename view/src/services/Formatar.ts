export const Formatar = {
  Money(money: number | string): string {
    return money.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  },
  Data(dataAtual: Date): string {
    let data = new Date(dataAtual),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  },
};
