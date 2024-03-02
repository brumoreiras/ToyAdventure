import './App.css';
import Alert from './Components/Alert/Alert.js';
import Header from './Components/Header/Header.js';
import Menu from './Components/Menu/Menu.js';
import Profile from './Components/Profile/Profile.js';
import FormsChange from './Pages/Formulario Alterar/FormsChange.js';
import SingIn from './Pages/Sing In/SingIn.js';

function App() {
  return (
    <div className="App">
      <Header />
      {/*    <FormsChange/> */}
      {/*    <Profile/> */}

      {/* <Menu/> */}
      <SingIn />
    </div>
  );
}

export default App;
