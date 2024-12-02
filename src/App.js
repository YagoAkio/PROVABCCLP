import { BrowserRouter, Routes, Route } from "react-router-dom";
import BatePapoTela from "./Telas/BatePapoTela";
import Home from "./Telas/Home";
import store from "./redux/store";
import { Provider } from "react-redux";
import TelaCadastroUsuario from "./Telas/TelaCadastroUsuario";
import TelaLogin from "./Telas/TelaLogin";
function App() {

  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {
          }
          <Route path="/login" element={<TelaLogin />} />
          <Route path="/batepapo" element={<BatePapoTela />} />
          <Route path="/usuario" element={<TelaCadastroUsuario />} />
          
          <Route path="/" element={<Home />} />
          {
          }
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
