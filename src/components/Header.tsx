const Header = () => {
    return (
        <header className="site-header">
            <div className="header-content">
                <img src="/assets/images/header.jpg" alt="Header Image" className="header-image" />
                <div className="marquee">
                    <p id="marquee-text"></p>
                </div>
                <button className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
