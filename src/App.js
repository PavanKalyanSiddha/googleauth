import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;


  }

  useEffect(() => {
    /*global google  */
    google.accounts.id.initialize({
      client_id: "744994446171-3h11bshg5d7mclq4jqkt42to26o5ot05.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
    
  }, []);
  // if we have no user: sign in button
  // if we have a user: show the log out button
  return <center className="App">
    <div id="signInDiv"></div>
    {
      Object.keys(user).length !== 0 &&
      <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
    }
    
    {user && 
      <div>
        <img src={user.picture} alt=""/>
        <h3>{user.name}</h3>
      </div>
      }
  </center>;
}

export default App;
