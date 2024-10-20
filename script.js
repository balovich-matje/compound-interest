const principalAmount = document.getElementById('initial-principal-balance');
const interestRate = document.getElementById('interest-rate');
const paymentPeriod = document.getElementById('payment-period');
const rangeValue = document.getElementById('range-value');
const investmentPeriod = document.getElementById('investment-period');
const resultField = document.getElementById('result-output')
const inputFields = document.querySelectorAll('input');

function calculateResult() {
    const principal = parseFloat(principalAmount.value);   // Initial amount (P)
    const annualRate = parseFloat(interestRate.value) / 100;  // Annual interest rate (r), convert from percentage to decimal
    const years = parseFloat(investmentPeriod.value);     // Number of years (t)
    const compoundingPerYear = parseFloat(paymentPeriod.value); // Number of times interest compounds per year (n)

    // Compound interest formula: A = P * (1 + r/n)^(nt)
    const finalAmount = principal * Math.pow((1 + annualRate / compoundingPerYear), compoundingPerYear * years);

    resultField.textContent = "Result: " + finalAmount.toFixed(2); // Display final amount, rounded to 2 decimal places
}


inputFields.forEach(function (input) {
    input.addEventListener('change', calculateResult);
})

paymentPeriod.addEventListener('input', function () {
    rangeValue.textContent = paymentPeriod.value;
});

