// Selecting DOM elements
const newItemForm = document.getElementById("new-item-form");
const newItemInput = document.getElementById("new-item-input");
const toBuyList = document.getElementById("to-buy");
const purchasedList = document.getElementById("purchased");

// Add item to "To Buy" list
function addItem(event) {
  event.preventDefault(); // Prevent form from submitting
  const itemText = newItemInput.value.trim(); // Trim whitespace from input
  if (itemText !== "") {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", moveItem);
    item.appendChild(checkbox);
    const text = document.createTextNode(itemText);
    item.appendChild(text);
    toBuyList.appendChild(item);
    newItemInput.value = ""; // Clear input field
  }
}

// Move item to "Already Purchased" list
function moveItem(event) {
  const item = event.target.parentNode;
  const checkbox = item.querySelector("input[type=checkbox]");
  if (checkbox.checked) {
    purchasedList.appendChild(item);
    item.classList.add("checked");
  } else {
    toBuyList.appendChild(item);
    item.classList.remove("checked");
  }
}

// Add event listener to form
newItemForm.addEventListener("submit", addItem);