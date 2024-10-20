const inputFields = document.querySelectorAll('input');
const rangeValue = document.getElementById('range-value');
const optionalRangeValue = document.getElementById('range-value-optional');

const principalAmount = document.getElementById('initial-principal-balance');
const interestRate = document.getElementById('interest-rate');
const paymentPeriod = document.getElementById('payment-period');
const settingsCheckbox = document.getElementById('enable-optional-settings');
const investmentPeriod = document.getElementById('investment-period');
const resultField = document.getElementById('result-output');
const optionalResultField = document.getElementById('result-output-optional');
const addedBalance = document.getElementById('added-balance');
const inflation = document.getElementById('inflation');

function calculateOptionalResult() {
    const principal = parseFloat(principalAmount.value);   // Initial amount (P)
    const annualRate = parseFloat(interestRate.value) / 100;  // Annual interest rate (r), convert from percentage to decimal
    const years = parseFloat(investmentPeriod.value);     // Number of years (t)
    const compoundingPerYear = 12 / parseFloat(paymentPeriod.value); // Number of times interest compounds per year (n)
    const monthlyAdded = parseFloat(addedBalance.value); // Monthly added balance (PMT)
    const annualInflation = parseFloat(inflation.value) / 100; // Annual inflation rate (i)

    // Adjust for inflation
    const realRate = (1 + annualRate) / (1 + annualInflation) - 1;
    // Compound interest formula: A = P * (1 + r/n)^(nt)
    const finalAmount = principal * Math.pow((1 + realRate / compoundingPerYear), compoundingPerYear * years);
    // Calculate future value of a series of monthly deposits
    const totalAddedValue = monthlyAdded * (((Math.pow((1 + realRate / compoundingPerYear), compoundingPerYear * years) - 1) / (realRate / compoundingPerYear)) * (1 + realRate / compoundingPerYear));
    // Total amount after considering added balance
    const totalFinalAmount = finalAmount + totalAddedValue;

    optionalResultField.textContent = totalFinalAmount.toFixed(2); // Display final amount, rounded to 2 decimal places
}

function calculateResult() {
    const principal = parseFloat(principalAmount.value);   // Initial amount (P)
    const annualRate = parseFloat(interestRate.value) / 100;  // Annual interest rate (r), convert from percentage to decimal
    const years = parseFloat(investmentPeriod.value);     // Number of years (t)
    const compoundingPerYear = 12 / parseFloat(paymentPeriod.value); // Number of times interest compounds per year (n)

    // Compound interest formula: A = P * (1 + r/n)^(nt)
    const finalAmount = principal * Math.pow((1 + annualRate / compoundingPerYear), compoundingPerYear * years);

    resultField.textContent = finalAmount.toFixed(2); // Display final amount, rounded to 2 decimal places
}


document.getElementById('enable-optional-settings').addEventListener('change', function () {
    const optionalDiv = document.getElementById('optional');
    if (this.checked) {
        optionalDiv.classList.remove('hidden');
    } else {
        optionalDiv.classList.add('hidden');
    }
});

// Select all inputs and fire result calculation on change
inputFields.forEach(function (input) {
    input.addEventListener('change', function() {
        calculateResult();
        calculateOptionalResult();
    });
})
// Display the selected value on the "Payment period" input
paymentPeriod.addEventListener('input', function () {
    rangeValue.textContent = paymentPeriod.value;
    optionalRangeValue.textContent = paymentPeriod.value;
});

calculateResult();
calculateOptionalResult();