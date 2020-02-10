import React, {useEffect, useState} from 'react'; //useeffect dispara uma função quando uma info mudar ou uma única vez
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


function App() {
  const [devs, setDevs] = useState([]); //armazenar os dados vindos da api listagem


  

  useEffect(() => {
    async function loadDevs(){//uso async nessa nova função, react nao recomenda em anonimas
      const response =  await api.get('/devs');

      setDevs(response.data);
    } 
    loadDevs();
  }, []);

  async function handleAddDev(data){ //submit
    //fetch - api nativa navegador para requisições rest, mas usaremos axios
    const response = await api.post('/devs', data);
    
    setDevs([...devs, response.data]); //adiciona logo quando se cadastra criando um novo estado (imutabilidade), remoção .filter, alteração .map

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => ( //{} retorno da func   () escopo da func         em iterações preciso tem uma chave para o elemento renderizado que é o id do meu banco
            <DevItem key={dev._id} dev={dev}/>  //propriedade dev
          ))}            
        </ul>
      </main>
    </div>
  );
}

export default App;
