window.onload = function () {
  console.log("Login page loaded successfully");
  const LoginForm = document.forms["LoginForm"];

  const loginstatus = document.getElementById("Loginstatus");
  const registerstatus = document.getElementById("Registrationstatus");
  LoginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("Login form submitted");

    const email = LoginForm.email.value;
    const password = LoginForm.password.value;
    console.log("Email:", email);
    console.log("Password:", password);

    const data = { email, password };
    console.log("Data to be sent:", data);

    requestCall(data);
  });
  async function requestCall(data) {
    fetch("https://socialmedia-backend-rjj7.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
        if (data.status === "success") {
          loginstatus.innerText = "👍Login successful...";
          loginstatus.style.color = "green";
          alert("login Successfull!"); // Redirect to the dashboard
        } else {
          loginstatus.innerHTML = `👎Login failed. Please try again.<br><b>Reason:</b> ${data.message}`;
          loginstatus.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        loginstatus.innerText = `👎Login failed. Please try again.<b>Reason:</b> ${error.message}`;
      });
  }

  const registerForm = document.forms["RegisterForm"];
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullname = registerForm.fullname.value;
    const email = registerForm.emaail.value;
    const password = registerForm.passwords.value;
    const confirmpassword = registerForm.confirmpasswords.value;

    const data = {
      name: fullname,
      email: email,
      password: password,
      passwordConfirm: confirmpassword,
    };
    console.log("Register form submitted", data);

    registerRequestCall(data);
  });

  async function registerRequestCall(data) {
    try {
      const response = await fetch(
        "https://socialmedia-backend-rjj7.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log("Registration response:", result);
      if (result.status === "success") {
        registerstatus.innerText = "👍Registration successful...";
        registerstatus.style.color = "green";
      } else {
        registerstatus.innerHTML = `👎Registration failed. Please try again.<br><b>Reason:</b> ${result.message}`;
        registerstatus.style.color = "red";
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
};
