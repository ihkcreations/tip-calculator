const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.btn-tip');
const customTipInput = document.getElementById('custom-tip');
const splitInput = document.getElementById('split');
const splitMinus = document.getElementById('split-minus');
const splitPlus = document.getElementById('split-plus');
const resTip = document.getElementById('res-tip');
const resTotalPerson = document.getElementById('res-total-person');
const resTotal = document.getElementById('res-total');
const resetBtn = document.getElementById('reset-btn');
let currentTip = 15;
function calculate() {
  const bill = parseFloat(billInput.value) || 0;
  const split = parseInt(splitInput.value) || 1;
  const tipAmount = (bill * currentTip) / 100;
  const totalBill = bill + tipAmount;
  const totalPerPerson = totalBill / split;
  const tipPerPerson = tipAmount / split;
  resTip.textContent = `$${tipPerPerson.toFixed(2)}`;
  resTotalPerson.textContent = `$${totalPerPerson.toFixed(2)}`;
  resTotal.textContent = `$${totalBill.toFixed(2)}`;
}
function setActiveTipButton(btn) {
  tipButtons.forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  }
}
billInput.addEventListener('input', calculate);
splitInput.addEventListener('input', calculate);
splitMinus.addEventListener('click', () => {
  let val = parseInt(splitInput.value) || 1;
  if (val > 1) {
    splitInput.value = val - 1;
    calculate();
  }
});
splitPlus.addEventListener('click', () => {
  let val = parseInt(splitInput.value) || 1;
  splitInput.value = val + 1;
  calculate();
});
tipButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    setActiveTipButton(e.target);
    currentTip = parseFloat(e.target.dataset.tip);
    customTipInput.value = '';
    calculate();
  });
});
customTipInput.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  if (!isNaN(val)) {
    currentTip = val;
    setActiveTipButton(null);
    calculate();
  } else {
    currentTip = 0;
    calculate();
  }
});
resetBtn.addEventListener('click', () => {
  billInput.value = '50.00';
  customTipInput.value = '';
  splitInput.value = '1';
  currentTip = 15;
  setActiveTipButton(document.querySelector('.btn-tip[data-tip="15"]'));
  calculate();
});
calculate();
