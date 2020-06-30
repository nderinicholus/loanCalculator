// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 2000);


  e.preventDefault();
});

function calculateResults() {

// UI vars
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

// Calculate
const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value) * 12;

// Compute monthly payment
const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x - 1);

// console.log('Amount is ', principal);
// console.log('Interest is ', calculatedInterest);
// console.log('Payments ', calculatedPayments);

if(isFinite(monthly)) {
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

  // Show results
  document.getElementById('results').style.display = 'block';

  // Hide the loader
  document.getElementById('loading').style.display = 'none';


} else {
  showError('Please check your numbers');

}

}

// Show Error
function showError(error) {

  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide the loader
  document.getElementById('loading').style.display = 'none';

  // create Div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = "alert alert-danger";

  // create a text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);

}

// clear Error
function clearError() {
  document.querySelector('.alert').remove();
}