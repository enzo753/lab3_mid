function isValidStudentNumber(value) {
    if (typeof value !== "string") return false;
    const trimmed = value.trim();
    const regex = /^\d{2}-\d{4}-\d{3}$/;
    return regex.test(trimmed);
  }
  
  function isValidPassword(value) {
    if (typeof value !== "string") return false;
    if (/\s/.test(value)) return false;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[A-Za-z\d@$!]{8,}$/;
    return regex.test(value);
  }
  
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      isValidStudentNumber,
      isValidPassword
    };
  }
  
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("registrationForm");
      const fullNameInput = document.getElementById("fullName");
      const studentNumberInput = document.getElementById("studentNumber");
      const emailInput = document.getElementById("email");
      const mobileNumberInput = document.getElementById("mobileNumber");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      const courseSelect = document.getElementById("course");
      const termsCheckbox = document.getElementById("terms");
  
      const fullNameError = document.getElementById("fullNameError");
      const studentNumberError = document.getElementById("studentNumberError");
      const emailError = document.getElementById("emailError");
      const mobileNumberError = document.getElementById("mobileNumberError");
      const passwordError = document.getElementById("passwordError");
      const confirmPasswordError = document.getElementById("confirmPasswordError");
      const courseError = document.getElementById("courseError");
      const termsError = document.getElementById("termsError");
      const passwordFeedback = document.getElementById("passwordFeedback");
  
      const successMessage = document.getElementById("successMessage");
      const registrationSummary = document.getElementById("registrationSummary");
      const summaryName = document.getElementById("summaryName");
      const summaryStudentNumber = document.getElementById("summaryStudentNumber");
      const summaryEmail = document.getElementById("summaryEmail");
      const summaryMobileNumber = document.getElementById("summaryMobileNumber");
      const summaryCourse = document.getElementById("summaryCourse");
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^(09\d{9}|\+639\d{9})$/;
  
      function setError(inputElem, errorElem, message) {
        if (errorElem) {
          errorElem.textContent = message;
        }
        if (inputElem) {
          inputElem.setAttribute("aria-invalid", "true");
        }
      }
  
      function clearError(inputElem, errorElem) {
        if (errorElem) {
          errorElem.textContent = "";
        }
        if (inputElem) {
          inputElem.setAttribute("aria-invalid", "false");
        }
      }
  
      function validateFullName() {
        const val = fullNameInput.value.trim();
        if (val === "") {
          setError(fullNameInput, fullNameError, "Full name is required.");
          return false;
        } else if (val.length < 2) {
          setError(fullNameInput, fullNameError, "Full name must be at least two characters long.");
          return false;
        }
        clearError(fullNameInput, fullNameError);
        return true;
      }
  
      function validateStudentNumber() {
        const val = studentNumberInput.value.trim();
        if (val === "") {
          setError(studentNumberInput, studentNumberError, "Student number is required.");
          return false;
        } else if (!isValidStudentNumber(val)) {
          setError(studentNumberInput, studentNumberError, "Enter a student number in the format 24-1234-123.");
          return false;
        }
        clearError(studentNumberInput, studentNumberError);
        return true;
      }
  
      function validateEmail() {
        const val = emailInput.value.trim();
        if (val === "") {
          setError(emailInput, emailError, "Email address is required.");
          return false;
        } else if (!emailRegex.test(val)) {
          setError(emailInput, emailError, "Enter a valid email address (e.g., user@example.com).");
          return false;
        }
        clearError(emailInput, emailError);
        return true;
      }
  
      function validateMobileNumber() {
        const val = mobileNumberInput.value.trim();
        if (val === "") {
          setError(mobileNumberInput, mobileNumberError, "Mobile number is required.");
          return false;
        } else if (!mobileRegex.test(val)) {
          setError(mobileNumberInput, mobileNumberError, "Enter a valid mobile number starting with 09 or +639 followed by 9 digits.");
          return false;
        }
        clearError(mobileNumberInput, mobileNumberError);
        return true;
      }
  
      function validatePassword() {
        const val = passwordInput.value;
        if (val === "") {
          setError(passwordInput, passwordError, "Password is required.");
          return false;
        } else if (!isValidPassword(val)) {
          setError(passwordInput, passwordError, "Password must be at least 8 characters, include an uppercase letter, a digit, and one of @, $, or !.");
          return false;
        }
        clearError(passwordInput, passwordError);
        return true;
      }
  
      function validateConfirmPassword() {
        const passwordVal = passwordInput.value;
        const confirmVal = confirmPasswordInput.value;
        if (confirmVal === "") {
          setError(confirmPasswordInput, confirmPasswordError, "Please confirm your password.");
          return false;
        } else if (confirmVal !== passwordVal) {
          setError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
          return false;
        }
        clearError(confirmPasswordInput, confirmPasswordError);
        return true;
      }
  
      function validateCourse() {
        const val = courseSelect.value;
        if (val !== "BSIT" && val !== "BSCS") {
          setError(courseSelect, courseError, "Please select a valid course (BSIT or BSCS).");
          return false;
        }
        clearError(courseSelect, courseError);
        return true;
      }
  
      function validateTerms() {
        if (!termsCheckbox.checked) {
          setError(termsCheckbox, termsError, "You must agree to the terms and conditions.");
          return false;
        }
        clearError(termsCheckbox, termsError);
        return true;
      }
  
      passwordInput.addEventListener("input", function () {
        const val = passwordInput.value;
        if (val === "") {
          passwordFeedback.textContent = "";
          passwordFeedback.classList.remove("valid");
        } else if (isValidPassword(val)) {
          passwordFeedback.textContent = "Password meets all requirements.";
          passwordFeedback.classList.add("valid");
        } else {
          passwordFeedback.textContent = "Password requires min 8 chars, 1 uppercase, 1 digit, and one of @, $, ! with no spaces.";
          passwordFeedback.classList.remove("valid");
        }
  
        if (confirmPasswordInput.value !== "") {
          validateConfirmPassword();
        }
      });
  
      fullNameInput.addEventListener("blur", function () {
        validateFullName();
      });
  
      studentNumberInput.addEventListener("blur", validateStudentNumber);
      emailInput.addEventListener("blur", validateEmail);
      mobileNumberInput.addEventListener("blur", validateMobileNumber);
      passwordInput.addEventListener("blur", validatePassword);
      confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
  
      courseSelect.addEventListener("change", function () {
        validateCourse();
      });
  
      termsCheckbox.addEventListener("change", function () {
        validateTerms();
      });
  
      function resetFormState() {
        form.reset();
  
        const errorSpans = document.querySelectorAll(".error-message");
        errorSpans.forEach(span => {
          span.textContent = "";
        });
  
        passwordFeedback.textContent = "";
        passwordFeedback.classList.remove("valid");
  
        const inputs = form.querySelectorAll("input, select");
        inputs.forEach(input => {
          input.removeAttribute("aria-invalid");
        });
  
        successMessage.textContent = "";
        registrationSummary.hidden = true;
  
        summaryName.textContent = "";
        summaryStudentNumber.textContent = "";
        summaryEmail.textContent = "";
        summaryMobileNumber.textContent = "";
        summaryCourse.textContent = "";
      }
  
      form.addEventListener("reset", function (e) {
        setTimeout(resetFormState, 0);
      });
  
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const isNameValid = validateFullName();
        const isStudentNumValid = validateStudentNumber();
        const isEmailValid = validateEmail();
        const isMobileValid = validateMobileNumber();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isCourseValid = validateCourse();
        const isTermsValid = validateTerms();
  
        const isFormValid = 
          isNameValid && 
          isStudentNumValid && 
          isEmailValid && 
          isMobileValid && 
          isPasswordValid && 
          isConfirmPasswordValid && 
          isCourseValid && 
          isTermsValid;
  
        if (isFormValid) {
          successMessage.textContent = "Registration details validated successfully!";
  
          summaryName.textContent = fullNameInput.value.trim();
          summaryStudentNumber.textContent = studentNumberInput.value.trim();
          summaryEmail.textContent = emailInput.value.trim();
          summaryMobileNumber.textContent = mobileNumberInput.value.trim();
          summaryCourse.textContent = courseSelect.value;
  
          registrationSummary.hidden = false;
        } else {
          successMessage.textContent = "";
          registrationSummary.hidden = true;
        }
      });
    });
  }