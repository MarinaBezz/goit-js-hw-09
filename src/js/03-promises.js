import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.body.style.backgroundColor = '#f7eff4';
const form = document.querySelector('form.form');
const options = {
  position: 'center-bottom',
  distance: '15px',
  borderRadius: '15px',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};

form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();
  let firstDelay = Number(form.delay.value);
  let step = Number(form.step.value);
  let amount = Number(form.amount.value);
  if (step < 0 || amount <= 0) {
    Notify.failure(`❌ Enter the value > 0`, { timeout: 3000 });
  } else {
    for (let i = 0; i < amount; i += 1) {
      let promiseDelay = firstDelay + step * i;
      createPromise(i, promiseDelay)
        .then(({ position, delay }) => {
          Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,

            {
              timeout: 3000,
            }
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
}
