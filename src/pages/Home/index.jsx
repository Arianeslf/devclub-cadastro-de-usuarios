import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const emailInputRef = useRef();

  async function getUsers() {
    const userFromApi = await api.get("/usuarios");
    setUsers(userFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
    });

    await getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    await getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>
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
      {users.map((user) => (
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
      ))}
    </div>
  );
}

export default Home;
