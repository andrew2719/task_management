import { ListTodo } from "lucide-react";
import "../styles/LandingPage.css";

function App() {
  return (
    <div className="lp-background">
    <div className="lp-app">
      
      <header className="lp-header">
        <nav>
          <button className="lp-btn lp-btn-login" onClick={() => window.location.href = "/login"}>Log In</button>
        </nav>
      </header>
      <main className="lp-main">
        <span>
          <span className="lp-highlight"></span>Manage Your Tasks Now
        </span>

        <button onClick={() => window.location.href = "/register"} className="lp-btn lp-btn-cta">Register/Login</button>
      </main>
    </div>
    </div>
    
  );
}

export default App;
