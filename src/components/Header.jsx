import headerLogo from "../images/header-logo.svg";

function Header() {
    return (
        <header className="header">
            <img src={headerLogo} alt="Лого" className="header__logo"/>
        </header>
    )
}

export default Header