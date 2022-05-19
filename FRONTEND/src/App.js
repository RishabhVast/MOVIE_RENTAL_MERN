import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import { loadLogin } from "./resources/login/loginSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
