import logo from "/src/assets/seal-question golden question.svg";

export default function Header() {
  return (
    <>
      <header>
        <div className="header-container">
          <img src={logo} alt="question mark in a ribbon" id="logo-header" />
          <h1>quizzical</h1>
        </div>
        <p className="intro-text">know it all? prove it!</p>
      </header>
    </>
  );
}
