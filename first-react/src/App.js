
import './App.css';
import { useState, useEffect } from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs';

const API = "http://localhost:5000";
const { v4: uuidv4 } = require('uuid');

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);//array de objetos (tarefas)
  const [loading, setLoading] = useState(false);


  // function idRandom() {
  //   const randomNumber = Math.floor(Math.random()*10000);
  //   const timeStamp = Date.now();
  //   return `${timeStamp}-${randomNumber}`
  // }
  //função que criei+C para melhorar a greação de id aleatório. posteriormente substituí+C pelo uso do
  //da biblioteca UUID que é mais segura. 

  useEffect(()=>{
      const loadData = async () => {
        setLoading(true);//porque ainda estarão sendo carregados os dados para a aplicação
        
        const res = await fetch (API+'/todos', {
                                                  method:"GET",
                                                  headers: {"Content-Type":"application/json"}
                                                })//não precisa configurar a requisição pois o padrão é um GET
                                                //porém configurei assim mesmo, para estudo.
          .then((res)=>res.json())
          .then((data)=>data)
          .catch((err)=> console.log(err));
    
        setLoading(false);
        setTodos(res);                                                            
      };
      loadData();
  },[]);


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
                                    headers: {"Content-Type":"application/json"}//configuraçao do tipo de header
                                  }
                );

    setTodos((prevState) => [...prevState, todo]);//uma vez que já deu certa a consulta ao servidor obtendo os dados
                                                  //utilizamos esse código para atualizar a seção de registros
                                                  //sem a necessidade de recarregarmos a página
                                                  //com o prevState, adicionamos um ítem ao estado anterior e geramos um novo estado.


    setTitle("");//aqui os campos title e time são zerados no front para o usuário, sem recarregar a página
    setTime("");//e voltam a mostrar os placeholders nos campos.

  };

  const handleDelete = async (id)=>{

    await fetch (API+"/todos/"+id,{ //o id está vindo como argumento da funçao
                                    method: "DELETE",
                                    //não tem corpo (body) e nem header porque não tem corpo.
                                  }
                );
    
    setTodos((prevState)=>prevState.filter((todo) => todo.id !== id));
    //aqui o método filter pega o array ToDo no seu estado atual e filtra todas as tarefas cujo id
    //seja diferente do id que foi escolhido para ser deletado
    //novamente recorre-se ao prevState para fazer a atualização da página sem a necessidade de
    //reload.

  };

  const handleEdit = async (todo) => {

    todo.done = !todo.done;//alteração no status da tarefa pelo toggle de inversão: se a tarefa está "pronta"
                          //ela fica "despronta". Se ela está "despronta" ela fica "pronta".

    const data = await fetch (API+"/todos/"+todo.id,{ //extrai-se o id da tarefa a ser editada pela propriedade, pois o argumento
                                                      //que foi enviado foi o ToDo completo.
                                                      //data é uma variáel que irá receber
                                                      method: "PUT",
                                                      body: JSON.stringify(todo),
                                                      headers:{"Content-Type":"application/json"}
                                                      //não tem corpo (body) e nem header porque não tem corpo.
                                                    }
                
                              );
    setTodos((prevState)=>prevState.map((t)=>(t.id===data.id) ? (t = data) : t));
    //cada ToDo é chamado de "t", de modo que se lê: mapeando t (um dado ToDO) tal que se o id do objeto t for igual ao id
    //do objeto data (que já contém a modificação) então este objeto t será substituído na totalidade pelo objeto data.
  };

  if(loading){
    return <p>Carregando dados...</p>
  }
  //npm run server npm start
  return (
    <div className="App">
      <div className='todo-header'>
        <h1>Project ToDo React</h1>
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

          <input type="submit" value="Criar Tarefa"/>

        </form>
      </div>

      <div className='list-todo'>
        <h2>Lista de Tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas cadastradas ainda !</p> }
        {todos.map((todo)=>(
          <div className='todo' key={todo.id}>
            {/* implemenatação de uma classe de estilo dinâmica no h3 */}
            <h3 className={todo.done ? "todo-done" : ""}>Título da Tarefa: {todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className='actions'>
              <span onClick={()=>handleEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill /> }
              </span>
              <BsTrash onClick={()=>handleDelete(todo.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
