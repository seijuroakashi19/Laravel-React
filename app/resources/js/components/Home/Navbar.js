import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {FaBars,FaTimes} from 'react-icons/fa';
import GlobalStyle,{Button} from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import InfoSection from './infosection.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  NavMenu,
  NavItem,
  NavLinks,
  MobileIcon,
  NavItemBtn,
  NavBtnLink
} from './Navbar.elements';


const Navbar = () => {
  const [click,setClick] = useState(false);
  const [button,setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const dataObj ={
    primary:true,
    lightBg:false,
    imgStart:'',
    lightTopLine:true,
    lightTextDesc:true,
    buttonLabel: 'Get Started',
    description:'We help business owner increase their revenue. Our team of unique specialist can help you achieve your business goals.',
    headline:"Lead Generation Specialist for Online Business",
    lightText:true,
    topLine:'3D Asset',
    img:'img/team_up.png',
    alt:'Image',
    start:''
  };

  const showButton = () =>{
    if (window.innerWidth <=960) {
      setButton(false)
    }else{
      setButton(true)
    }
  }
  const login = () => {
    location.replace("/login");
  }
  const signup = () => {
    location.replace("/register");
  }

  useEffect(() =>{
    showButton();
  },[]);

  window.addEventListener('resize',showButton);

  return (
    <>
    <Router>
    <IconContext.Provider value={{color:'#fff'}}>
    <GlobalStyle/>
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <NavIcon />
            Game Asset
        </NavLogo>
        <MobileIcon onClick={handleClick}>
          {click ? <FaTimes/> : <FaBars/>}
        </MobileIcon>
        <NavMenu onClick={handleClick} click={click}>
          <NavItem>
            <NavLinks to='/' onClick={() => sayHello()} style={{textDecoration: 'none'}}>Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='/' style={{textDecoration: 'none'}}>Shop</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='/' style={{textDecoration: 'none'}}>Contact</NavLinks>
          </NavItem>
          <NavItemBtn >
          {button ? (
            <NavBtnLink to='/login' onClick={() => login()}>
            <Button primary>Login
            </Button>
            </NavBtnLink>
          ) : (
            <NavBtnLink to='/register' onClick={() => signup()}>
            <Button fontBig primary >SignUp
            </Button>
            </NavBtnLink>
          )
        }
        </NavItemBtn>
        <NavItemBtn onClick={() =>signup()}>
          {button ? (
              <NavBtnLink to='/register'>
              <Button primary>SignUp
              </Button>
              </NavBtnLink>
            ) : (
              <>
              </>
            )
          }
        </NavItemBtn>
        </NavMenu>
      </NavbarContainer>
    </Nav>
    </IconContext.Provider>
    <InfoSection {...dataObj} />
    </Router>
    </>
  );
}

export default Navbar;

if (document.getElementById('navbars')) {
    ReactDOM.render(<Navbar />, document.getElementById('navbars'));
}
