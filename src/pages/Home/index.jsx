import { useEffect, useState } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
const [users, setUsers] = useState([]);

  async function getUsers() {
    const userFromApi = await api.get("/usuarios");
    
    setUsers(userFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>
        <input type="text" placeholder="Nome" name="name" />
        <input type="number" placeholder="Idade" name="idade" />
        <input type="email" placeholder="Email" name="email" />
        <button type="submit">Cadastrar</button>
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
          <button>
            <img src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
