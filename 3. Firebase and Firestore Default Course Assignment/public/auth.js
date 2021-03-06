(function() {

    //Global variable
    window.auth = {};

    //Reference to database
    const db = firebase.firestore();

    //Register new user
    function Register(e) {
        e.preventDefault();
        //Get values
        const email     = register_email.value;
        const password  = register_password.value;

        //Clear form
        register_form.reset();

        //Create user
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                email: email
            });
        })
        .then(() => {
            console.log("User successfully registered");
        })
        .catch(function(error) {
            //Handle errors here
            console.log(error);
            const errorCode     = error.code;
            const errorMessage  = error.message;
        });
    }

    //Login a user
    function Login(e) {
        e.preventDefault();
        //Get values
        const email     = login_email.value;
        const password  = login_password.value;

        //Clear form
        login_form.reset();

        //Sign user in
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            console.log("User successfully logged in");
        }).catch(function(error) {
            //Handle errors here
            console.log(error);
            const errorCode     = error.code;
            const errorMessage  = error.message;
        });
    }

    //Logout a user
    function Logout(e) {
        e.preventDefault();
        //Sign user out
        firebase.auth().signOut();
    }

    //Will be called whenever auth state changes
    function authStateChanged(user) {
        //User is signed in
        if(user) {
            register.style.display      = "none";
            LogIn.style.display         = "none";
            logout_btn.style.display    = "block";
            if(auth.login) console.log("No login event");
            else auth.loginEvent();
        }
        //No user is signed in
        else {
            register.style.display      = "block";
            LogIn.style.display         = "block";
            logout_btn.style.display    = "none";
            if(auth.logout) console.log("No logout event");
            else auth.logoutEvent();
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        //Register button is clicked
        register_submit_button.addEventListener('click', Register);

        //Log In button is clicked
        login_submit_button.addEventListener('click', Login);

        //Log Out button is clicked
        logout_btn.addEventListener('click', Logout);

        const auth = firebase.auth();
        auth.onAuthStateChanged(authStateChanged);
    });

}) ();