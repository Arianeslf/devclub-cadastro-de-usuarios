import { useEffect, useRef, useState } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

const COLORS = ["#7c6af7", "#f76a6a", "#6af7b8", "#f7c56a", "#6ab8f7"];

function getInitials(name) {
  return (
    name
      ?.split(" ")
      .map((item) => item[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

function getColor(name) {
  let hash = 0;

  for (let i = 0; i < name?.length; i++) {
    hash += name.charCodeAt(i);
  }

  return COLORS[hash % COLORS.length];
}

function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    try {
      setLoading(true);

      const usersFromApi = await api.get("/usuarios");

      setUsers(usersFromApi.data);
    } catch (error) {
      showMessage("error", "Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function createUsers() {
    const name = inputName.current.value;
    const age = inputAge.current.value;
    const email = inputEmail.current.value;

    if (!name || !age || !email) {
      showMessage("error", "Preencha todos os campos.");
      return;
    }

    try {
      await api.post("/usuarios", {
        name,
        age,
        email,
      });

      showMessage("success", "Usuário cadastrado com sucesso!");

      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";

      getUsers();
    } catch (error) {
      showMessage("error", "Erro ao cadastrar usuário.");
    }
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);

      showMessage("success", "Usuário removido.");

      getUsers();
    } catch (error) {
      showMessage("error", "Erro ao deletar usuário.");
    }
  }

  function showMessage(type, text) {
    setMessage({ type, text });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className={`container ${theme}`}>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <header className="header">
        <div className="logo">
          <h1>
            Gerenciamento de <span>Usuários</span>
          </h1>
        </div>

        <div className="header-actions">
          <div className="search">
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="toggle-circle">
              {theme === "dark" ? "☾" : "☀"}
            </span>
          </button>
        </div>
      </header>

      <main className="main">
        <section className="form-card">
          <div className="card-title">
            <div>
              <h2 className="big-title">Cadastro de Usuário</h2>

              <p className="subtitle">
                Preencha os campos abaixo para criar um novo usuário.
              </p>
            </div>
          </div>

          <label>Nome</label>

          <div className="input-box">
            <input
              placeholder="Digite o nome completo"
              name="nome"
              type="text"
              ref={inputName}
            />
          </div>

          <label>Idade</label>

          <div className="input-box">
            <input
              placeholder="Digite a idade"
              name="idade"
              type="number"
              ref={inputAge}
            />
          </div>

          <label>Email</label>

          <div className="input-box">
            <input
              placeholder="Digite o email"
              name="email"
              type="email"
              ref={inputEmail}
            />
          </div>

          <button className="submit-button" onClick={createUsers}>
            Cadastrar Usuário
          </button>
        </section>

        <section className="users-card">
          <div className="card-title">
            <div>
              <h2 className="big-title">Usuários Cadastrados</h2>

              <p className="subtitle">
                Lista de todos os usuários cadastrados no sistema.
              </p>
            </div>
          </div>

          <div className="stats">
            <div>
              <p>Total de Usuários</p>
              <strong>{users.length}</strong>
            </div>

            <div>
              <p>Emails Ativos</p>
              <strong>{users.length}</strong>
            </div>

            <div>
              <p>Resultados</p>
              <strong>{filteredUsers.length}</strong>
            </div>
          </div>

          {loading ? (
            <p className="loading">Carregando usuários...</p>
          ) : (
            <div className="users-list">
              <div className="table-header">
                <span>Usuário</span>
                <span>Idade</span>
                <span>Email</span>
                <span>Ações</span>
              </div>

              {filteredUsers.map((user) => (
                <div className="user-row" key={user.id}>
                  <div className="user-name">
                    <div
                      className="avatar"
                      style={{ background: getColor(user.name) }}
                    >
                      {getInitials(user.name)}
                    </div>

                    <strong>{user.name}</strong>
                  </div>

                  <span>{user.age}</span>

                  <span>{user.email}</span>

                  <button
                    className="delete-button"
                    onClick={() => deleteUsers(user.id)}
                  >
                    <img src={Trash} alt="Deletar" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
