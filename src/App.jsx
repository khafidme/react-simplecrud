//Import route rules
import Routes from "./routes";
import Navbar from "./navbar";

function App() {

  return (
    <>
        {/** Navbar Area */}
        <Navbar />

        {/** Content Area */}
        <Routes />
    </>
  )
}

export default App;
