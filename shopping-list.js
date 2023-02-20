// Obtém elementos do DOM
const newItemInput = document.getElementById('new-item');
const addButton = document.getElementById('add-button');
const removeAllButton = document.getElementById('remove-all-button');
const toBuyList = document.getElementById('to-buy');

// Array para armazenar os items
let items = [];

// Adiciona listeners aos botões
addButton.addEventListener('click', addItem);
removeAllButton.addEventListener('click', removeAllItems);
window.addEventListener('load', loadItems);

// Adiciona novo item à lista
function addItem() {
  // Obtém valor do novo item e remove espaços em branco
  const newItem = newItemInput.value.trim();
  
  if (newItem !== '') {
    const itemElement = createItemElement(newItem);
    toBuyList.appendChild(itemElement);
    newItemInput.value = '';
    items.push(newItem);
    saveItems(); // Salva lista de items no localStorage
  }
}

// Remove todos os items da lista
function removeAllItems() {
  toBuyList.innerHTML = ''; // Remove todos os elementos filhos da lista
  items = []; // Remove todos os items do array

  // Remove lista de items do localStorage
  localStorage.removeItem('items');
}

// Remove um item do array de items
function removeItem(item) {
  const index = items.indexOf(item);
  if (index > -1) {
    items.splice(index, 1);
  }
}

// Salva lista de items no localStorage
function saveItems() {
  localStorage.setItem('items', JSON.stringify(items));
}

// Carrega lista de items do localStorage
function loadItems() {
  const savedItems = localStorage.getItem('items');
  if (savedItems) {
    items = JSON.parse(savedItems); // Converte string de JSON para um array de items

    // Cria elementos para cada item salvo e adiciona à lista de items a comprar
    items.forEach((item) => {
      const itemElement = createItemElement(item);
      toBuyList.appendChild(itemElement);
    });
  }
}

// Cria elemento HTML para um novo item
function createItemElement(itemText) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('item');

  const checkboxElement = document.createElement('input');
  checkboxElement.setAttribute('type', 'checkbox');

  const spanElement = document.createElement('span');
  spanElement.innerText = itemText;

  // Adiciona listener ao checkbox para marcar ou desmarcar o item como completo
  checkboxElement.addEventListener('change', () => {
    if (checkboxElement.checked) {
      spanElement.classList.add('completed');
    } else {
      spanElement.classList.remove('completed');
    }
    saveItems(); // Salva lista de items no localStorage
  });

  const deleteIconElement = document.createElement('div');
  deleteIconElement.classList.add('delete-icon');

  // Adiciona listener ao ícone de deletar para remover o item da lista
  deleteIconElement.addEventListener('click', () => {
    itemElement.remove();
    removeItem(itemText);
    saveItems(); // Salva lista de items no localStorage
  });

  // Adiciona elementos ao item HTML
  itemElement.appendChild(checkboxElement);
  itemElement.appendChild(spanElement);
  itemElement.appendChild(deleteIconElement);

  return itemElement;
}
