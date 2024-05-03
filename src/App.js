import { Route,Routes } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder';
import TopNavigation from './pages/components/TopNavigation';
import Home from './pages/Home';

function App() {
  return (
    <>
      <TopNavigation />
      <div>
        <Routes>        
          <Route path="/"  element={<Home/>} />
          <Route path="/relatorio-final-pid"  element={<FormBuilder rel={"relatorio-final-pid"}/>}/>
          <Route path="/relatorio-projeto-ped"  element={<FormBuilder rel={"relatorio-projeto-ped"}/>}/>
          <Route path="/interesse-projeto-ped"  element={<FormBuilder rel={"relatorio-interesse-projeto-ped"}/>}/>
          <Route path="/saved-form"  element={<FormBuilder rel={"saved-form"}/>}/>
          <Route path="/uploaded-form"  element={<FormBuilder rel={"uploaded-form"}/>}/>
        </Routes>
      </div>
    </>
  )

}

export default App;
