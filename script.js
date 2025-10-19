class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = parseFloat(salario);
  }

  toString() {
    return `${this.nome} (${this.cargo}) - R$${this.salario.toFixed(2)}`;
  }
}

const form = document.getElementById("formFuncionario");
const tabela = document.getElementById("tabelaFuncionarios");
let funcionarios = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new Funcionario(
    document.getElementById("nome").value,
    document.getElementById("idade").value,
    document.getElementById("cargo").value,
    document.getElementById("salario").value
  );
  funcionarios.push(f);
  form.reset();
  renderTabela();
});

const renderTabela = () => {
  tabela.innerHTML = "";
  funcionarios.forEach(f => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.nome}</td>
      <td>${f.idade}</td>
      <td>${f.cargo}</td>
      <td>R$ ${f.salario.toFixed(2)}</td>
    `;
    tabela.appendChild(tr);
  });
};
