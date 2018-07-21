'use strict';

const STORE = {
  
	items :[
		{name: 'apples', checked: false},
		{name: 'oranges', checked: false},
		{name: 'milk', checked: true},
		{name: 'bread', checked: false}
	],

	displayChecked : false
};

function generateItemElement(item, itemIndex, template) {
	return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
	console.log('Generating shopping list element');

	const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
	return items.join('');
}


function renderShoppingList() {
	// render the shopping list in the DOM
	console.log('`renderShoppingList` ran');
  let shoppingListItemsString = generateShoppingItemsString(STORE.items);

  let checkedItems = []
  if (STORE.displayChecked === true) {
    shoppingListItemsString = generateShoppingItemsString(STORE.items.filter(objItem => objItem.checked === false));
  }
  //console.log(shoppingListItemsString);

  	// insert that HTML into the DOM
	$('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
	console.log(`Adding "${itemName}" to shopping list`);
	STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
	$('#js-shopping-list-form').submit(function(event) {
		event.preventDefault();
		console.log('`handleNewItemSubmit` ran');
		const newItemName = $('.js-shopping-list-entry').val();
		$('.js-shopping-list-entry').val('');
		addItemToShoppingList(newItemName);
		renderShoppingList();
	});
}

function toggleCheckedForListItem(itemIndex) {
	console.log('Toggling checked property for item at index ' + itemIndex);
	STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function deleteItemClicked(itemIndex) {
	console.log('Deleting item from index' + itemIndex);
	STORE.items.splice(itemIndex,1);
}

function getItemIndexFromElement(item) {
	const itemIndexString = $(item)
		.closest('.js-item-index-element')
		.attr('data-item-index');
	return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
	$('.js-shopping-list').on('click', '.js-item-toggle', event => {
		console.log('`handleItemCheckClicked` ran');
		const itemIndex = getItemIndexFromElement(event.currentTarget);
		toggleCheckedForListItem(itemIndex);
		renderShoppingList();
	});
}

function handleDeleteItemClicked() {
	// this function will be responsible for when users want to delete a shopping list
	// item
	$('.js-shopping-list').on('click', '.js-item-delete', event => {
		console.log('`handDeleteItemClicked` ran');
		const itemIndex = getItemIndexFromElement(event.currentTarget);
		console.log(itemIndex);
		deleteItemClicked(itemIndex);
		renderShoppingList();
	});
}

function handleSwitchItemClicked() {
	// this function will be responsible for when users want to hide checked items
	$('#js-shopping-list-form').on('change', '#shopping-list-checkbox', event => {
		console.log('`handleSwitchItemClicked` ran');
		// create variable that stores indexes that contain false for checked property  
		// move to render inside if-statement ==> STORE.checkedItems = STORE.items.filter(objItem => objItem.checked === true);
		STORE.displayChecked = !STORE.displayChecked;
		renderShoppingList()
	});
}

function handleShoppingList() {
	renderShoppingList();
	handleNewItemSubmit();
	handleItemCheckClicked();
	handleDeleteItemClicked();
	handleSwitchItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);