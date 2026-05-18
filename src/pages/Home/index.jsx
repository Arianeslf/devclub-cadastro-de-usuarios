import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const emailInputRef = useRef();

  async function getUsers() {
    setLoading(true);
    const userFromApi = await api.get("/usuarios");
    setUsers(userFromApi.data);
    setLoading(false);
  }

  async function createUsers() {
    try {
      await api.post("/usuarios", {
        name: nameInputRef.current.value,
        age: ageInputRef.current.value,
        email: emailInputRef.current.value,
      });

      setMessage({ type: "success", text: "Usuário cadastrado com sucesso!" });
      await getUsers();
    } catch (error) {
      if (error.response?.data?.error?.includes("Unique constraint")) {
        setMessage({ type: "error", text: "Email já cadastrado!" });
      } else {
        setMessage({ type: "error", text: "Erro ao cadastrar usuário!" });
      }
    }

    setTimeout(() => setMessage(null), 3000);
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    await getUsers();
  }

  useEffect(() => {
    getUsers();

    const interval = setInterval(
      () => {
        api.get("/usuarios");
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>
        {message && (
          <p className={message.type === "error" ? "msg-error" : "msg-success"}>
            {message.text}
          </p>
        )}
        <input type="text" placeholder="Nome" name="name" ref={nameInputRef} />
        <input
          type="number"
          placeholder="Idade"
          name="idade"
          ref={ageInputRef}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={emailInputRef}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>
      {loading ? (
        <p style={{ color: "#fff", marginTop: 20 }}>Carregando usuários...</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="user-card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="Excluir" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
