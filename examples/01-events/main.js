import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const incrementButton = document.getElementById("increment");
  const decrementButton = document.getElementById("decrement");
  const counterDisplay = document.getElementById("counter");

  let counter = 0;
  const subs = [];
  subs.push(
    incrementButton.when("click").subscribe(() => {
      counter += 1;
      counterDisplay.textContent = `${counter}`;
    }),
  );
  subs.push(
    decrementButton.when("click").subscribe(() => {
      counter -= 1;
      counterDisplay.textContent = `${counter}`;
    }),
  );
});
