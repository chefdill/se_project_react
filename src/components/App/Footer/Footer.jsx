import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>Developed By Dillon Sareerat</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
