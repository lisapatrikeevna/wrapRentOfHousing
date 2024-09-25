import cl from './Header.module.scss'
import logoImg from './../../assets/logo.png'

const Header = () => {
  return (
    <header className={cl.headerWrap}>
      <div className={cl.header}>
        <img src={logoImg} alt="logoImg"/>
        <p>head</p>
      </div>
      <nav className={cl.navbar}>
menu list
      </nav>
    </header>
    );
};

export default Header;














