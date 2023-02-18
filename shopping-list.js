//JS for shopping list
const newItemInput = document.getElementById('new-item');
const addButton = document.getElementById('add-button');
const removeAllButton = document.getElementById('remove-all-button');
const toBuyList = document.getElementById('to-buy');
let items = [];

addButton.addEventListener('click', addItem);
removeAllButton.addEventListener('click', removeAllItems);
window.addEventListener('load', loadItems);

function addItem() {
  const newItem = newItemInput.value.trim();
  if (newItem !== '') {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    const checkboxElement = document.createElement('input');
    checkboxElement.setAttribute('type', 'checkbox');
    const spanElement = document.createElement('span');
    spanElement.innerText = newItem;

    // Add event listener to checkbox element to cross out text when checked
    checkboxElement.addEventListener('change', () => {
      if (checkboxElement.checked) {
        spanElement.classList.add('completed');
      } else {
        spanElement.classList.remove('completed');
      }
      saveItems();
    });

    const deleteIconElement = document.createElement('div');
    deleteIconElement.classList.add('delete-icon');
    deleteIconElement.addEventListener('click', () => {
      itemElement.remove();
      removeItem(newItem);
      saveItems();
    });
    itemElement.appendChild(checkboxElement);
    itemElement.appendChild(spanElement);
    itemElement.appendChild(deleteIconElement);
    toBuyList.appendChild(itemElement);
    newItemInput.value = '';
    items.push(newItem);
    saveItems();
  }
}

function removeAllItems() {
  toBuyList.innerHTML = '';
  items = [];
  localStorage.removeItem('items');
}

function removeItem(item) {
  const index = items.indexOf(item);
  if (index > -1) {
    items.splice(index, 1);
  }
}

function saveItems() {
  localStorage.setItem('items', JSON.stringify(items));
}

function loadItems() {
  const savedItems = localStorage.getItem('items');
  if (savedItems) {
    items = JSON.parse(savedItems);
    items.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      const checkboxElement = document.createElement('input');
      checkboxElement.setAttribute('type', 'checkbox');
      const spanElement = document.createElement('span');
      spanElement.innerText = item;

      // Add event listener to checkbox element to cross out text when checked
      checkboxElement.addEventListener('change', () => {
        if (checkboxElement.checked) {
          spanElement.classList.add('completed');
        } else {
          spanElement.classList.remove('completed');
        }
        saveItems();
      });

      const deleteIconElement = document.createElement('div');
      deleteIconElement.classList.add('delete-icon');
      deleteIconElement.addEventListener('click', () => {
        itemElement.remove();
        removeItem(item);
        saveItems();
      });
      itemElement.appendChild(checkboxElement);
      itemElement.appendChild(spanElement);
      itemElement.appendChild(deleteIconElement);
      toBuyList.appendChild(itemElement);
    });
  }
}
