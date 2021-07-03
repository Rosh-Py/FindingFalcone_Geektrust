import { HomePage } from "./pages";
import { Selection } from "./components";
function App() {
  return (
    <div className="App">
      <HomePage />
      <Selection
        number={0}
        availableDestinations={["lengaburu", "sapir"]}
        availableSpaceCrafts={{ rocket: 1, jet: 2 }}
      />
    </div>
  );
}

export default App;
