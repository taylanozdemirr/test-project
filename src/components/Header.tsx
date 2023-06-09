import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';



function Header() {

//Çıkış butonu fonksiyonu
  
function LogOut() {
    window.location.href = '/'
  }


  return (
    <Container>
      <Navbar expand="lg" variant="light" >
        <Container>
          <Navbar.Brand href="#">
            <Image src="./img/logo.png" alt="" width='50' height='50' className='d-inline-block align-top ' />
          </Navbar.Brand>

          <Button onClick={LogOut} variant="primary">Çıkış</Button>


        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;
