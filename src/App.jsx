import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityPage from "./Pages/CityPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/store.js";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:country/:city" element={<CityPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
