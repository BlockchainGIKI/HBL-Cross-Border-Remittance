import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import '/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import SignUp from './Components/Sign-up/Sign-up.component';
import Login from './Components/Log-in/Log-in.component';
import Home from './Components/Home/Home.component';
import DynamicTable from './Components/DynamicTable/DynamicTable.component';
import TransferMoney from './Components/TransferMoney/TransferMoney.component';
import ExchangeRate from './Components/ExchanageRate/ExchangeRate.component';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}>
            <Route path='transaction-history' element={<DynamicTable tableValue="TransactionHistory" forPrint="Sent Transactions">
            </DynamicTable>} />
            <Route path='favorite' element={<DynamicTable tableValue="FavortiePeople" forPrint="Received Transactions">
            </DynamicTable>} />
            <Route path='transfer-money' element={<TransferMoney></TransferMoney>} />
            <Route path='exchange' element={<ExchangeRate></ExchangeRate>} />
          </Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </div >
    </Provider>
  );
}

export default App;

