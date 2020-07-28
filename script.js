//Button used to trigger bill calculation
let calculateButton = document.getElementById("calculate");
//Contains amount entered in input for bill amount
let billAmount = document.getElementById("bill-amount");

//Contains amount entered in input for number of people
let numberOfPeople = document.getElementById("number-of-people");

//Used to display the bill amount per person on the screen after calculation is complete
let billAmountPerPerson = document.getElementById("bill-amount-per-person");

//Checkboxes for categories
let dinnerCheckbox = document.getElementById("dinner-checkbox");
let drinksCheckbox = document.getElementById("drinks-checkbox");
let cinemaCheckbox = document.getElementById("cinema-checkbox");
let otherCheckbox = document.getElementById("other-checkbox");

//Initialising variables for spend per category
let totalDinnerSpendValue = 0;
let totalDrinksSpendValue = 0;
let totalCinemaSpendValue = 0;
let totalOtherSpendValue = 0;

//Obtaining DOM elements for each category
let totalDinnerSpend = document.getElementById('dinner-totalSpend');
let totalDrinksSpend = document.getElementById('drinks-totalSpend');
let totalCinemaSpend = document.getElementById('cinema-totalSpend');
let totalOtherSpend = document.getElementById('other-totalSpend');

//Checking local storage for each category item. If value is present that is displayed, else set to 0.
if (localStorage.getItem('total_Dinner_Spend')) {
  totalDinnerSpend.textContent = JSON.parse(localStorage.getItem('total_Dinner_Spend'));
  totalDinnerSpendValue = JSON.parse(localStorage.getItem('total_Dinner_Spend'));
}
else {
  totalDinnerSpend.textContent = 0;
}

if (localStorage.getItem('total_Drinks_Spend')) {
 

  totalDrinksSpend.textContent = JSON.parse(localStorage.getItem('total_Drinks_Spend'));
  totalDrinksSpendValue = JSON.parse(localStorage.getItem('total_Dinner_Spend'));
}
else {
  totalDrinksSpend.textContent = 0;
}

if (localStorage.getItem('total_Cinema_Spend')) {
  totalCinemaSpend.textContent = JSON.parse(localStorage.getItem('total_Cinema_Spend'));
  totalCinemaSpendValue = JSON.parse(localStorage.getItem('total_Cinema_Spend'));
}
else {
  totalCinemaSpend.textContent = 0;
}

if (localStorage.getItem('total_Other_Spend')) {
  totalOtherSpend.textContent = JSON.parse(localStorage.getItem('total_Other_Spend'));
  totalOtherSpendValue = JSON.parse(localStorage.getItem('total_Other_Spend'));
}
else {
  totalOtherSpend.textContent = 0;
}


//Adding all checkboxes to an array (for looping purposes)
let allCheckboxes = [
  dinnerCheckbox,
  drinksCheckbox,
  cinemaCheckbox,
  otherCheckbox,
];

//Initially hiding result component (before calculation is made)
let resultComponent = document.getElementById("result");
resultComponent.style.display = "none";

//Initialising variable for checkbox value
let billCategory;

/* 
Looping through each checkbox to add a click event listener to each one.
If a checkbox is checked, billCategory is set to the innerText of e.target.nextElementSibling.
Also adds functionality to disable all other checkboxes once one has been clicked (to avoid the user
selecting multiple checkboxes).

If user unchecks the checked checkbox, all checkboxes are reenabled to allow the user to
select one again.
*/
allCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      billCategory = e.target.nextElementSibling.innerText;
      for (let i = 0; i < allCheckboxes.length; i++) {
        if (allCheckboxes[i].checked) {
          continue;
        } else {
          allCheckboxes[i].disabled = true;
        }
      } 
    } else if (!e.target.checked) {
      for (let i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].disabled = false;
      }
    }
  });
});

/*
Adding click event listener to the calculate button.
Bill per person is calculated.
If the bill amount per person is greater than 0, the additional result component
is displayed with the amount to be paid per person.
Local storage is used to update the total individual spend per category,
enabling persistence of data.
*/
calculateButton.addEventListener("click", () => {
  let splitBill = billAmount.value / numberOfPeople.value;
  let splitBillRounded = parseFloat(splitBill, 10);

  if (splitBillRounded > 0) {
    resultComponent.style.display = "block";

    if (billCategory === undefined || billCategory.toLowerCase() === 'other' ) {
      totalOtherSpendValue += splitBillRounded;
      
       totalOtherSpend.textContent = totalOtherSpendValue.toFixed(2);
       localStorage.setItem('total_Other_Spend', totalOtherSpendValue.toFixed(2));
       
    }
  

 else  if (billCategory.toLowerCase() === 'dinner') {
    totalDinnerSpendValue += splitBillRounded;
    
     totalDinnerSpend.textContent = totalDinnerSpendValue.toFixed(2);
     localStorage.setItem('total_Dinner_Spend', totalDinnerSpendValue.toFixed(2));
     
  }

  else if (billCategory.toLowerCase() === 'drinks') {
    totalDrinksSpendValue += splitBillRounded;
    
    totalDrinksSpend.textContent = totalDrinksSpendValue.toFixed(2);
    localStorage.setItem('total_Drinks_Spend', totalDrinksSpendValue.toFixed(2));
     
  }

  else if (billCategory.toLowerCase() === 'cinema') {
    totalCinemaSpendValue += splitBillRounded;
    
     totalCinemaSpend.textContent = totalCinemaSpendValue.toFixed(2);
     localStorage.setItem('total_Cinema_Spend', totalCinemaSpendValue.toFixed(2));
  }

 

}
  billAmountPerPerson.textContent = `€${splitBillRounded.toFixed(
    2
  )} to be paid per person`;


  //Resetting values so that the user can use the service again to split another bill
  billAmount.value = "";
  numberOfPeople.value = "";
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = false;
  }
  );
});
