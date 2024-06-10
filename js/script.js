const nextButton = document.querySelectorAll('[data-next]');
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progressbar-step");
const username = document.getElementById('userName');
const usernameValidationMessage = document.getElementById('validationUserName');
const email = document.getElementById('email');
const emailValidationMessage = document.getElementById('validationEmail');

//Password
const password = document.getElementById('password');
const passwordValidationMessage = document.getElementById('validationPassword');
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordValidationMessage = document.getElementById('validationConfirmPassword');
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-={}[\]:;\"'<>,.?\/]).{8,}$/;

const confirmPasswordCharacterValidationMessage = document.getElementById('validationCharacterPassword');

const firstName = document.getElementById('firstname');
const firstNameValidationMessage = document.getElementById('validationfirstname');
const lastName = document.getElementById('lastname');
const lastNameValidationMessage = document.getElementById('validationlastname');
const bday = document.getElementById('bday');
const bdayValidationMessage = document.getElementById('validationbday');
const address = document.getElementById('address1');
const addressValidationMessage = document.getElementById('validationaddress');
const postalcode = document.getElementById('pcode');
const pcodeValidationMessage = document.getElementById('validationpcode');
const phone = document.getElementById('phone');
const phoneValidationMessage = document.getElementById('validationphone');
const countryDropdown = document.getElementById("country-dropdown");
const prefixDropdown = document.getElementById("prefix-dropdown");
let contrasenaigual = false;
let formStepsNum = 0;

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });
  formSteps[formStepsNum].classList.add("form-step-active");

  // Debugging: Log the current step
  console.log('Step:', formStepsNum);
}

function updateProgressBar() {
  // Check if the index is within bounds
  if (formStepsNum < progressSteps.length) {
    progressSteps[formStepsNum].classList.add("progress-step-active");
  }
  // Debugging: Log progress steps
  console.log('Progress Steps:', progressSteps);
}



//Validations
nextButton.forEach(nextButton => {
  nextButton.addEventListener("click", (event) => {
    if (formStepsNum === 0 && (username.value.trim().length < 5 || username.value.trim().length > 20)) {
      event.preventDefault();
      username.classList.add('validation--input');
      usernameValidationMessage.style.display = 'block';
    } else if (formStepsNum === 0 && (email.value.trim().length === 0 || email.value.indexOf('@') === -1 || email.value.length > 50)) {
      event.preventDefault();
      email.classList.add('validation--input');
      emailValidationMessage.style.display = 'block';
    } else if (formStepsNum === 0 && (password.value.trim().length === 0)) {
      event.preventDefault();
      password.classList.add('validation--input');
      passwordValidationMessage.style.display = 'block';
    } else if (formStepsNum === 0 && (confirmPassword.value.trim().length === 0)) {
      event.preventDefault();
      confirmPassword.classList.add('validation--input');
      confirmPasswordValidationMessage.style.display = 'block';

    } else if (formStepsNum === 1 && (firstName.value.trim().length === 0)) {
      event.preventDefault();
      firstName.classList.add('validation--input');
      firstNameValidationMessage.style.display = 'block';
    } else if (formStepsNum === 1 && (lastName.value.trim().length === 0)) {
      event.preventDefault();
      lastName.classList.add('validation--input');
      lastNameValidationMessage.style.display = 'block';
    } else if (formStepsNum === 1 && (bday.value.trim().length === 0)) {
      event.preventDefault();
      bday.classList.add('validation--input');
      bdayValidationMessage.style.display = 'block';
    } else if (formStepsNum === 1 && (address.value.trim().length === 0)) {
      event.preventDefault();
      address.classList.add('validation--input');
      addressValidationMessage.style.display = 'block';
    } else if (formStepsNum === 1 && (postalcode.value.trim().length === 0)) {
      event.preventDefault();
      postalcode.classList.add('validation--input');
      pcodeValidationMessage.style.display = 'block';
    } else if (formStepsNum === 1 && (phone.value.trim().length === 0)) {
      event.preventDefault();
      phone.classList.add('validation--input');
      phoneValidationMessage.style.display = 'block';

    } else if (contrasenaigual == false) {
      event.preventDefault();

    }
    else if (formStepsNum === 0 && !passwordRegex.test(password.value.trim())) {
      event.preventDefault();
      password.classList.add('validation--input');
      confirmPasswordCharacterValidationMessage.style.display = 'block';

    } else {
      username.classList.remove('validation--input');
      email.classList.remove('validation--input');
      password.classList.remove('validation--input');
      confirmPassword.classList.remove('validation--input');

      firstName.classList.remove('validation--input');
      lastName.classList.remove('validation--input');
      bday.classList.remove('validation--input');
      address.classList.remove('validation--input');
      postalcode.classList.remove('validation--input');
      phone.classList.remove('validation--input');

      usernameValidationMessage.style.display = 'none';
      emailValidationMessage.style.display = 'none';
      passwordValidationMessage.style.display = 'none';
      confirmPasswordValidationMessage.style.display = 'none';

      firstNameValidationMessage.style.display = 'none';
      lastNameValidationMessage.style.display = 'none';
      bdayValidationMessage.style.display = 'none';
      addressValidationMessage.style.display = 'none';
      pcodeValidationMessage.style.display = 'none';
      phoneValidationMessage.style.display = 'none';

      formStepsNum++;
      updateFormSteps();
      updateProgressBar();
    }
  })
});


// TELEPHONE NUMBERS ONLY

let phoneInput = document.getElementById('phone');
let phoneValidationError = document.getElementById('validationphone');

phoneInput.addEventListener('input', function() {
  // Remove non-numeric characters from the entered value
  let cleanedValue = phoneInput.value.replace(/\D/g, '');

  // Check if the cleaned value matches the expected pattern
  if (!/^(\d{3})(\d{3})(\d{3})$/.test(cleanedValue)) {
    phoneValidationError.style.display = 'block';
  } else {
    phoneValidationError.style.display = 'none';
  }

  // Format the cleaned value back into the desired format (e.g., (123) 456-789)
  let formattedValue = cleanedValue.replace(/(\d{3})(\d{3})(\d{3})/, '($1) $2-$3');
  phoneInput.value = formattedValue;
});


// COUNTRY - PHONE PREFIX

document.addEventListener("DOMContentLoaded", function() {

  countryDropdown.addEventListener("change", function() {

    const selectedCountry = countryDropdown.value;

    const countryToPrefix = {
      "Andorra": "+376",
      "Spain": "+34",
      "France": "+33",
      "Germany": "+49",
      "Greece": "+30"
    };

    if (countryToPrefix[selectedCountry]) {
      prefixDropdown.value = countryToPrefix[selectedCountry];
      console.log(countryToPrefix[selectedCountry]);
    }
  });
});

// TOGGLE PASSWORD VISIBILITY ¡¡¡OK!!! // OPTION A
document.addEventListener('DOMContentLoaded', function() {
  passwordVisibility();
});

function passwordVisibility() {
  const passwordInput = document.getElementById('password');
  const showPasswordButton = document.querySelector('[data-showPassword]');


  showPasswordButton.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });
}

//TOGGLE PASSWORD CONFIRM VISIBILITY ¡¡¡OK!!!
document.addEventListener('DOMContentLoaded', function() {
  confirmPasswordVisibility();
});

function confirmPasswordVisibility() {
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const confirmPasswordButton = document.getElementById('showConfirmPassword');

  confirmPasswordButton.addEventListener('click', function() {
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
    } else {
      confirmPasswordInput.type = 'password';
    }
  })
}

//Passwords must be the same
document.addEventListener("DOMContentLoaded", function() {

  // Get references to the password fields and the error message
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const confirmPasswordValidation = document.getElementById('validationConfirmPassword');

  // Function to check if passwords match
  function checkPasswordsMatch() {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    // Compare passwords
    if (password === confirmPassword) {
      // Passwords match, hide error message
      confirmPasswordValidation.style.display = 'none';
      contrasenaigual = true;
    } else {
      // Passwords don't match, show error message
      confirmPasswordValidation.style.display = 'block';
      contrasenaigual = false;
    }
  }

  // Listen for input changes in the confirm password field
  confirmPasswordField.addEventListener('input', checkPasswordsMatch);


});


//TO CALCULATE THE TOTAL PRICE (SHIPPING + ITEM PRICE) AND TO SHOW THE SELECTED SHIPPING PRICE
document.addEventListener("DOMContentLoaded", function() {

  let totalPriceValue = 14.55;

  const totalPrice = document.getElementById("totalPrice");
  const totalPriceFinish = document.getElementById("totalPriceFinish");

  // Get all radio buttons with the name 'shipping'
  const shippingOptions = document.querySelectorAll('input[name="shipping-option"]'); // ¡OJO! cambiado, anteriormente ID

  // Function to update the price based on the selected shipping option
  function updatePrice() {
    // Loop through the radio buttons to find the selected one
    shippingOptions.forEach(option => {
      if (option.checked) {
        // Update the price based on the selected option
        switch (option.value) {
          case "3":
            document.getElementById("shippingPrice").innerText = "Shipping     price: Free";
            document.getElementById("shippingPriceFinish").innerText = "Shipping     price: Free";
            totalPriceValue = 14.55 + 0;
          case "2":
            document.getElementById("shippingPrice").innerText = "Extra shipping price: 4.99 €";
            document.getElementById("shippingPriceFinish").innerText = "Extra shipping price: 4.99 €";
            totalPriceValue = 14.55 + 4.99;
            break;
          case "1":
            document.getElementById("shippingPrice").innerText = "Premium shipping price: 9.99 €";
            document.getElementById("shippingPriceFinish").innerText = "Premium shipping price: 9.99 €";
            totalPriceValue = 14.55 + 9.99;
            break;
          default:
            document.getElementById("shippingPrice").innerText = "Shipping     price: Free";
            document.getElementById("shippingPriceFinish").innerText = "Shipping     price: Free";
            totalPriceValue = 14.55 + 0;
            break;
        }
      }
    });
    totalPrice.textContent = "Total: " + totalPriceValue.toFixed(2) + " €";
    totalPriceFinish.textContent = "Total: " + totalPriceValue.toFixed(2) + " €";

  }
  //}para cerrar la línea de "document.addEventListener("DOMContentLoaded", function() {" da problemas

  // Add event listener to each radio button to update price on change
  shippingOptions.forEach(option => {
    option.addEventListener('change', updatePrice)
  });


  const showContentButton = document.getElementById("showContentButton");
  const formContainer = document.getElementById("formContainer");
  const mainPage = document.querySelector(".mainpage"); // Selecting the mainpage element
  const mainPreview = document.getElementById('mainPreview');

  // Show the content when the button is clicked
  showContentButton.addEventListener("click", function() {
    formContainer.style.display = "block";
    showContentButton.style.display = "none";

    // Hide the mainpage when the button is clicked
    mainPage.style.display = "none";

    const selectedImage = document.querySelector(".gaspar-sweater");
    const selectedImage2 = document.getElementById("gaspar-sweater-thankyou");


    const purchaseprice = document.getElementById("purchasesize");
    const purchasepriceFinish = document.getElementById("purchasesizeFinish");

    const selectedOption = document.getElementById("selectedOption");



    purchaseprice.textContent = "Size: " + selectedOption.textContent;
    purchasepriceFinish.textContent = "Size: " + selectedOption.textContent;

    selectedImage.src = mainPreview.src;
    selectedImage2.src = mainPreview.src;



    const purchasecolor = document.getElementById("purchasecolor");
    const purchasecolorFinish = document.getElementById("purchasecolorFinish");


    const currentColor = document.getElementById("currentColor");

    const currentColorcontent = currentColor.textContent;


    console.log("currentColorcontent: ", currentColorcontent);



    const colonIndex = currentColorcontent.indexOf(": ");

    if (colonIndex !== -1) {
      const selectedValue = currentColorcontent.substring(colonIndex + 2);
      purchasecolor.textContent = "Color: " + selectedValue;
      purchasecolorFinish.textContent = "Color: " + selectedValue;
    }
  });


  // Get references to DOM elements
  const selectedOption = document.getElementById("selectedOption");
  const options = document.querySelectorAll(".dropdown-content a");


  // Object containing color images
  const colorImages = {
    red: [
      'assets/jersey_red.png',
      'assets/jersey_red2.png',
      'assets/jersey_red3.png',
      'assets/jersey_red4.png'
    ],
    blue: [
      'assets/jersey_blue.png',
      'assets/jersey_blue2.png',
      'assets/jersey_blue3.png',
      'assets/jersey_blue4.png'
    ],
    green: [
      'assets/jersey_green.png',
      'assets/jersey_green2.png',
      'assets/jersey_green3.png',
      'assets/jersey_green4.png'
    ]
  };

  // Function to update the selected text in dropdown
  function changeSelectedText(event, selectedOption) {
    selectedOption.innerText = event.target.textContent;
  }

  // Event listeners for dropdown options
  options.forEach((option) => {
    option.addEventListener("click", function(event) {
      changeSelectedText(event, selectedOption);
    });
  });


  // Function to swap main and clicked image in preview
  function changePreview(image) {
    mainPreview.src = image.src;

  }

  // Function to change the main preview image
  function changeMainPreview(imageSrc) {
    mainPreview.src = imageSrc;
  }



  function updatePreviewImages(images) {
    for (let i = 1; i <= 4; i++) {
      const previewImage = document.getElementById(`red${i}`);
      previewImage.src = colorImages[images[0]][i - 1];
    }
  }

  function updateCurrentColorText(images) {
    const currentColorSpan = document.getElementById('currentColor');
    const colorText = images[0].charAt(0).toUpperCase() + images[0].slice(1);
    currentColorSpan.textContent = `Color: ${colorText}`;
  }



  // Event listeners for each color image in the product preview
  const colorImageElements = document.querySelectorAll('.product-preview__vertical img');
  colorImageElements.forEach((image) => {
    image.addEventListener('click', function() {
      changePreview(image);
      //changePreviewImages([color]);


    });
  });

  // Function to add event listeners for each color button
  function addColorEventListener(color) {
    const colorImage = document.getElementById(color);
    colorImage.addEventListener('click', function() {
      changeMainPreview(colorImages[color][0]);
      updatePreviewImages([color]);
      updateCurrentColorText([color]);
    });
  }


  // Add event listeners for each color button
  addColorEventListener('red');
  addColorEventListener('blue');
  addColorEventListener('green');

});

// gift or not
const nextButtonShipping = document.getElementById('nextButtonShipping');
const gift = document.getElementById('itIsAGift');
const giftOption = document.getElementById('giftOption');
let clickCount = 0;

const giftCheck = document.getElementById('gift');

giftCheck.addEventListener('click', function() {
  clickCount++;

  if (clickCount % 2 !== 0 && giftCheck.checked) {
    giftOption.style.display = 'block';
    console.log("es un regalo");
  } else {
    console.log("pues no");
    giftOption.style.display = 'none';
  }
});
// Due date calculator

document.querySelectorAll('input[name="shipping-option"]').forEach((elem) => {
  elem.addEventListener("change", updateDueDate);
});

// Trigger change event for the initially checked option
const initiallyCheckedOption = document.querySelector('input[name="shipping-option"]:checked');
if (initiallyCheckedOption) {
  initiallyCheckedOption.dispatchEvent(new Event('change'));
}

function updateDueDate(event) {
  const value = event.target.value;
  let date1 = "";
  let date2 = "";

  if (value == "1") {
    date1 = addDays(1);
    date2 = addDays(2);
  } else if (value == "2") {
    date1 = addDays(2);
    date2 = addDays(3);
  } else {
    date1 = addDays(3);
    date2 = addDays(4);
  }

  document.querySelectorAll('[data-delivery-estimation]').forEach((elem) => {
    elem.innerHTML = `Between ${date1} and ${date2}`;
  });
}

function addDays(days) {
  var result = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long'
  });
  result.setDate(result.getDate() + days);
  return formatter.format(result);
}


// SHIPPING CONDITIONS VALIDATION CHECKBOX


const buttonBuyFinish = document.getElementById('btn-buy-now-finished');
document.addEventListener("click", (event) => {
  if (event.target === buttonBuyFinish) {
    handleBuyFinishClick(event);
  } else if (event.target.classList.contains('next-button')) {
    handleNextButtonClick(event);
  }
});

function handleBuyFinishClick(event) {
  const conditionsCheckbox = document.getElementById('conditions');

  if (!conditionsCheckbox.checked) {
    console.log("Checkbox not checked. Preventing default.");
    event.preventDefault();
    alert("Please accept the terms and conditions");
  } else {
    console.log("Checkbox checked. Proceeding to the next step.");
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  }
}

function handleNextButtonClick(event) {
  const currentStepInputs = getCurrentStepInputs();

  for (const input of currentStepInputs) {
    if (input.value.trim().length === 0) {
      event.preventDefault();
      input.classList.add('validation--input');
      const validationMessage = document.getElementById(`${input.id}-validation-message`);
      validationMessage.style.display = 'block';
    }
  }

  // If all inputs are filled, proceed to the next step
  if (!event.defaultPrevented) {
    resetValidationStyles();
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  }
}

function getCurrentStepInputs() {
  const step0Inputs = ['username', 'email', 'password', 'confirmPassword'];
  const step1Inputs = ['firstName', 'lastName', 'bday', 'address', 'postalcode', 'phone'];

  const currentStepInputs = (formStepsNum === 0) ? step0Inputs : step1Inputs;

  return currentStepInputs.map(id => document.getElementById(id));
}

function resetValidationStyles() {
  const allInputs = document.querySelectorAll('input');
  allInputs.forEach(input => {
    input.classList.remove('validation--input');
    const validationMessage = document.getElementById(`${input.id}-validation-message`);
    validationMessage.style.display = 'none';
  });
}