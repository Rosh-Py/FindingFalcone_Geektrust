import { HomePage, ResultsPage } from "./pages";
import { Header, Footer } from "./components";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Wrapper className="main">
          <div className="bg-img"></div>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/results">
              <ResultsPage />
            </Route>
          </Switch>
        </Wrapper>
        <Footer />
      </Router>
    </div>
  );
}

const Wrapper = styled.div`
  .bg-img {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      center/ cover no-repeat
        url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")
        fixed;
  }
`;

export default App;
