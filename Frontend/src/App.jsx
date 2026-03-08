import './App.css'
import { BrowserRouter } from "react-router-dom";
import DefaultRoutes from './routes/DefaultRoutes';

function App() {

  return (
<>
<BrowserRouter>
<DefaultRoutes/>
</BrowserRouter>
</>
  )
}

export default App
