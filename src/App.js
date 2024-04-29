
import FormBuilder from './pages/FormBuilder';
import TopNavigation from './pages/components/TopNavigation';
import Home from './pages/Home';

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/relatorio-final-pid":
      component = <FormBuilder rel={"relatorio-final-pid"}/>
      break
    case "/relatorio-projeto-ped":
      component = <FormBuilder rel={"relatorio-projeto-ped"}/>
      break
    case "/interesse-projeto-ped":
      component = <FormBuilder rel={"relatorio-interesse-projeto-ped"}/>
      break
    case "/saved-form":
      component = <FormBuilder rel={"saved-form"} />
      break
    case "/uploaded-form":
      component = <FormBuilder rel={"uploaded-form"} />
      break
  }

  return (
    <>
      <TopNavigation />
      {component}
    </>
  )

}

export default App;
