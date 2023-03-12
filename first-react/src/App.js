
import './App.css';
import { useState, useEffect } from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs';

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => { //essa função trata da execução da submissão do formulário 
                                //sem gerar uma situação de recarregamento da página
    e.preventDefault(); //esse comando é dado por essa propriedade (preventDefault()) aplicada ao evento "e".
    console.log("Tarefa Criada");
    console.log(title);
    console.log(time);
    setTitle("");
    setTime("");
  }
  
  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React ToDo</h1>
      </div>
      <div className='form-todo'>
        <h2>Insira sua próxima tarefa</h2>
        
        <form id='formToDo' onSubmit={handleSubmit}>
          
          <div className='form-control'>
            <label htmlFor='title'>O que você vai fazer ?</label>
            <input 
              id='taskTitle' 
              type="text" 
              name='title' 
              placeholder="Título da sua próxima tarefa"
              onChange={(e)=>setTitle(e.target.value)} //essa linha captura a alteração no input e altera o estado do objeto. ou seja está sendo colocado no estado o valor do input digitado pelo usuario
              value={title || ""} //essa linha usa uma técnica chamada controlled input, onde o value recebe o estado do input. Isso permite depois passar para o setTitle, modificando o texto que ele está escrito.
                            //isso serve pra limpar o input depois se for necessário.
                            //a inicialização vazia é necessária porque o estado é preenchido depois de um tempo
                            //e isso gera um erro. para corrigir, colocamos o || "" para que ele incie com o
                            //vazio e depois faça a troca.
              required
            />

            </div>
            <div className='form-control'>
            <label htmlFor='time'>Duração: </label>
            <input 
              id='taskTime' 
              type="text" 
              name='time' 
              placeholder="Tempo estimado em horas"
              onChange={(e)=>setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>

          {/* <div className='form-control'>
            <label htmlFor='task'>Tarefa: </label>
            <input 
              id='taskDescription' 
              type="text" 
              name='task' 
              placeholder="Descreva sua tarefa"
              onChange={(e)=>setTodos(e.target.value)}
              value={todos || ""}
              required
            />
          </div> */}
          
          <input type="submit" value="Criar Tarefa"/>

        </form>
      </div>

      <div className='list-todo'>
        <h2>Lista de Tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas cadastradas ainda !</p> }
      </div>
    </div>
    
  );
}

export default App;
