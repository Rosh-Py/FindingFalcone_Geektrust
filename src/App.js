import { HomePage } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
