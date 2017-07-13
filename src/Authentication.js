import React, { Component} from 'react';
const firebase = require('firebase');

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);

class Authentication extends Component {

  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    // Todo Handle login promise
    promise.then((user) => {
      const logout = document.getElementById('logout');
      logout.classList.remove('hide');
      this.setState({error: "Welcome back, " + user.email});
    });


    promise.catch((err) => {
      let error = err.message;
      console.log(error);
      this.setState({error:error});
    });
  }

  signup(event) {
    console.log("Sign up clicked");
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      let err = "Welcome " + user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({error:err});
    });

    promise
    .catch(e => {
      let err = e.message;
      this.setState({error:err});
      console.log(err);
    });

  }

  logout(event) {
    firebase.auth().signOut;
    const logout = document.getElementById('logout');
    logout.classList.add('hide');

    this.setState({error: "Thanks for visiting. See you soon!"});

  }
  constructor(props){
    super(props);

    this.state = {
      error: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email"  /><br />
        <input id="password" ref="password" type="password" placeholder="Enter your passowrd"  /><br />
        <p>{this.state.error}</p>
        <button type="submit" onClick={this.login}>Log In</button>
        <button type="submit" onClick={this.signup}>Sign Up</button>
        <button id="logout" className="hide" type="submit" onClick={this.logout}>Log Out</button>

      </div>
    );
  }
}

export default Authentication;
