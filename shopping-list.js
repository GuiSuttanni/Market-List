const newItemInput = document.getElementById('new-item');
const addButton = document.getElementById('add-button');
const removeAllButton = document.getElementById('remove-all-button');
const toBuyList = document.getElementById('to-buy');

addButton.addEventListener('click', addItem);
removeAllButton.addEventListener('click', removeAllItems);

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
    });
    
    const deleteIconElement = document.createElement('div');
    deleteIconElement.classList.add('delete-icon');
    deleteIconElement.addEventListener('click', () => {
      itemElement.remove();
    });
    itemElement.appendChild(checkboxElement);
    itemElement.appendChild(spanElement);
    itemElement.appendChild(deleteIconElement);
    toBuyList.appendChild(itemElement);
    newItemInput.value = '';
  }
}

function removeAllItems() {
  toBuyList.innerHTML = '';
}
