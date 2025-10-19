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

const editarFuncionario = i => {
  const f = funcionarios[i];
  ["nome","idade","cargo","salario"].forEach(id => document.getElementById(id).value = f[id]);
  editIndex = i;
};

const excluirFuncionario = i => {
  funcionarios.splice(i, 1);
  renderTabela();
};

const relatorio = document.getElementById("relatorio");

const salariosAltos = () => {
  const altos = funcionarios.filter(f => f.salario > 5000);
  relatorio.textContent = altos.map(f => f.toString()).join("\n") || "Nenhum";
};

const mediaSalarial = () => {
  if (funcionarios.length === 0) return relatorio.textContent = "Sem funcionários";
  const media = funcionarios.reduce((acc,f) => acc + f.salario,0) / funcionarios.length;
  relatorio.textContent = `Média salarial: R$ ${media.toFixed(2)}`;
};

const cargosUnicos = () => {
  const cargos = [...new Set(funcionarios.map(f => f.cargo))];
  relatorio.textContent = "Cargos únicos:\n" + cargos.join("\n");
};

const nomesMaiusculos = () => {
  const nomes = funcionarios.map(f => f.nome.toUpperCase());
  relatorio.textContent = "Nomes maiúsculo:\n" + nomes.join("\n");
};



