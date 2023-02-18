// Select HTML elements
const newItemForm = document.getElementById("new-item-form");
const newItemInput = document.getElementById("new-item-input");
const toBuyList = document.getElementById("to-buy");
const purchasedList = document.getElementById("purchased");

// Function to create a new item and add it to the "To Buy" list
function addItem(event) {
  event.preventDefault(); // Prevent form from submitting

  // Create new item with checkbox and text content
  const item = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", moveItem);
  const text = document.createTextNode(newItemInput.value);
  item.appendChild(checkbox);
  item.appendChild(text);

  // Add new item to "To Buy" list
  toBuyList.appendChild(item);

  // Clear input field
  newItemInput.value = "";
}

// Function to move item to "Already Purchased" list and add delete icon
function moveItem(event) {
  const item = event.target.parentNode;
  if (event.target.checked) {
    // Move item to "Already Purchased" list
    purchasedList.appendChild(item);
    item.classList.add("checked");

    // Add delete icon to item
    const deleteIcon = document.createElement("span");
    deleteIcon.className = "delete-icon";
    deleteIcon.addEventListener("click", deleteItem);
    item.appendChild(deleteIcon);
  } else {
    // Move item back to "To Buy" list
    toBuyList.appendChild(item);
    item.classList.remove("checked");

    // Remove delete icon from item
    const deleteIcon = item.querySelector(".delete-icon");
    if (deleteIcon) {
      item.removeChild(deleteIcon);
    }
  }
}

// Function to delete item from "Already Purchased" list
function deleteItem(event) {
  const item = event.target.parentNode;
  purchasedList.removeChild(item);
}

// Add event listener to form
newItemForm.addEventListener("submit", addItem);
