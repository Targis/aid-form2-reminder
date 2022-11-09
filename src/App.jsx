import Header from 'components/Header'
import RegisterForm from 'components/RegisterForm'
import Container from '@mui/material/Container'


function App() {
  return (
    <div className="App">
      <Header />
      <Container spacing="2" maxWidth="sm" direction="column">
        <RegisterForm />
      </Container>
    </div >
  )
}

export default App