//rotas para as páginas - navegação
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer( //fora de toda navegação
    createStackNavigator({
        Main: { //obj - para customização
            screen: Main, //qual será carregado
            navigationOptions: { //opções dessa tela - Head title: componente ou imagem
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        }
    }, { //2 parametro da createStackNavigator -- configs
        defaultNavigationOptions: { // aplicada a todas as telas
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerStyle:{
                backgroundColor: '#7D40E7'
            }
        }
    })
);

export default Routes;