import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
let formState = {};
const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);
function onInput(e) {
  const { name, value } = e.target;
  formState[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

function onSubmit(e) {
  e.preventDefault();
  console.log(formState);
  formState = {};
  localStorage.removeItem(STORAGE_KEY);
  e.target.reset();
}

function onLoad() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    console.log(data);
    formState = JSON.parse(data);
    console.log(formState);
    console.log(Object.entries(formState));
    Object.entries(formState).forEach(([key, value]) => {
      formEl.elements[key].value = value;
    });
  } catch (error) {
    console.log(error.message);
  }
}

window.addEventListener('load', onLoad);
