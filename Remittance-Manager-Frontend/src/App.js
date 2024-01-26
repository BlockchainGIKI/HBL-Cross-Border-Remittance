import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from './Components/Sign-up/Sign-up.component';
import Login from './Components/Log-in/Log-in.component';
import Home from './Components/Home/Home.component';
import DynamicTable from './Components/DynamicTable/DynamicTable.component';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

function App() {

  //const { value, setValue } = useState("");
  //let value = "";

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home></Home>}>
            <Route path='favorite' element={<DynamicTable tableValue="FavortiePeople" forPrint="Favoritees list">
            </DynamicTable>} />
            <Route path='connect-MetaMask' element={<></>} />
            <Route path='active-users' element={<></>} />
            <Route path='remove-user' element={<></>} />
            <Route path='create-user' element={<></>} />
            <Route path='blacklist-user' element={<></>} />
            <Route path='send-stablecoins' element={<></>} />
            <Route path='view-exchange-rate' element={<></>} />
            <Route path='customer-transaction-history' element={<></>} />
            <Route path='deleted-users' element={<></>} />
            <Route path='transaction-history' element={<></>} />
          </Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
