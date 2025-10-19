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
let editIndex = -1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new Funcionario(
    document.getElementById("nome").value,
    document.getElementById("idade").value,
    document.getElementById("cargo").value,
    document.getElementById("salario").value
  );

  if (editIndex === -1) funcionarios.push(f);
  else funcionarios[editIndex] = f;

  form.reset();
  editIndex = -1;
  renderTabela();
});

// Alteração do renderTabela
const renderTabela = () => {
  tabela.innerHTML = "";
  funcionarios.forEach((f, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.nome}</td>
      <td>${f.idade}</td>
      <td>${f.cargo}</td>
      <td>R$ ${f.salario.toFixed(2)}</td>
      <td>
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
      </td>
    `;
    tr.querySelector(".editar").addEventListener("click", () => editarFuncionario(i));
    tr.querySelector(".excluir").addEventListener("click", () => excluirFuncionario(i));
    tabela.appendChild(tr);
  });
};

const editarFuncionario = (i) => {
  const f = funcionarios[i];
  document.getElementById("nome").value = f.nome;
  document.getElementById("idade").value = f.idade;
  document.getElementById("cargo").value = f.cargo;
  document.getElementById("salario").value = f.salario;
  editIndex = i;
};

const excluirFuncionario = (i) => {
  funcionarios.splice(i, 1);
  renderTabela();
};

