import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppComponent from "./components/AppComponent";
import AppDescription from "./components/AppDescription";
import AppsState from "./context/AppsState";
import Admin from "./components/admin/Admin";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AppsState>
        <BrowserRouter>
          <Navbar />
          <AppComponent />
          <Routes>
            <Route
              exact
              path="/appDescription"
              element={<AppDescription />}
            ></Route>
            <Route
              exact
              path="/admin"
              element={<Admin />}
            ></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppsState>
    </>
  );
}

export default App;
