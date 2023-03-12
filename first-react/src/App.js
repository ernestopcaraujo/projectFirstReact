
import './App.css';
import { useState, useEffect } from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs';

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);


  // function idRandom() {
  //   const randomNumber = Math.floor(Math.random()*10000);
  //   const timeStamp = Date.now();
  //   return `${timeStamp}-${randomNumber}`
  // }
  //função que criei+C para melhorar a greação de id aleatório. posteriormente substituí+C pelo uso do
  //da biblioteca UUID que é mais segura. 

  const { v4: uuidv4 } = require('uuid');


  const handleSubmit = async (e) => { //essa função trata da execução da submissão do formulário 
                                //sem gerar uma situação de recarregamento da página.
                                //outra coisa importante é a adição do asyn-await para
                                //aguardar o retorno do back-end.
    e.preventDefault(); //esse comando é dado por essa propriedade (preventDefault()) aplicada ao evento "e".
    
    console.log(title);//essas 3 linhas mostram o estado atual de tempo e title e confirmam
    console.log(time);//a submissão dos ddos
    console.log("Tarefa Criada");

    const todo = { //criação do objeto "todo", que contém as propriedades das tarefas.
      id: uuidv4(), //criação de um id aleatório.não é o melhor métdo.
      title,
      time,
      done: false //por default, colocaremos as tarefas inicialmente com "não feitas" ou seja com o "done" em "false"
    }
    console.log(todo)

    await fetch (API + '/todos', {// aqui enviamos os dados para o back-end
                                    method:"POST", //configuração do tipo de requisição que está sendo feita
                                    body: JSON.stringify(todo), //A linha de comando body: JSON.stringify(object) é usada para 
                                                                //converter um objeto JavaScript em uma string JSON. 
                                                                //Essa string JSON pode ser enviada no corpo da solicitação POST 
                                                                //para o servidor JSON.
                                    headers: {"Content-Type":"application/json"}}
                );


    setTitle("");//aqui os campos title e time são zerados no front para o usuário, sem recarregar a página
    setTime("");//e voltam a mostrar os placeholders nos campos.

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
