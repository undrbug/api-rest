document.addEventListener("DOMContentLoaded", function () {
    const validateEmail = () => {
          const email = emailInput.value;
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          let spanError = document.getElementById("email-error");
  
          if (!emailRegex.test(email)) {
              spanError.textContent = "Por favor, introduce un correo válido";
              emailInput.classList.add("is-invalid");
              return false;
          } else {
              spanError.textContent = "";
              emailInput.classList.remove("is-invalid");
              return true;
          }
      };
  
      const validatePassword = () => {
          const password = passwordInput.value;
          let spanError = document.getElementById("password-error");
  
          if (password.length < 6) {
              spanError.textContent =
                  "La contraseña debe tener al menos 6 caracteres";
              passwordInput.classList.add("is-invalid");
              return false;
          } else {
              spanError.textContent = "";
              passwordInput.classList.remove("is-invalid");
              return true;
          }
      };
    
      let formm = document.querySelector("form");
  
      let emailInput = document.getElementById("email");
      let passwordInput = document.getElementById("password");
  
      emailInput.addEventListener("blur", validateEmail);
      passwordInput.addEventListener("blur", validatePassword);
  
      formm.addEventListener("submit", (event) => {
          event.preventDefault();
          let emailValid = validateEmail(emailInput);
          let passwordValid = validatePassword(passwordInput);
  
          if (emailValid && passwordValid) {
              formm.submit();
          }
      });
  
  
  });
  