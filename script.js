document.addEventListener('DOMContentLoaded', function() {
    loadItems();
});

function addItem() {
    // Check if the new item group is empty and return if it is
    if (document.getElementById("new-item-group").value === "") {
        return;
    }

    var ul = document.getElementById("todo-list");
    var newItem = document.getElementById("new-item").value;
    var newGroup = document.getElementById("new-item-group").value;

    if (newItem.trim() !== "") {
        var li = document.createElement("li");
        li.innerHTML = newItem + ' (' + newGroup + ') <button class="remove" onclick="removeItem(this)">X</button>';
        ul.appendChild(li);
        
        // Clear the input fields
        document.getElementById("new-item").value = "";
        document.getElementById("new-item-group").value = "";
        
        // Save the items
        saveItems();
    }
}


function removeItem(button) {
    var li = button.parentNode;
    li.parentNode.removeChild(li);
    saveItems();
}

function saveItems() {
    var ul = document.getElementById("todo-list");
    var items = {};
    for (var i = 0; i < ul.children.length; i++) {
        var text = ul.children[i].innerText;
        var itemName = text.substring(0, text.indexOf('(')).trim();
        var itemGroup = text.substring(text.indexOf('(') + 1, text.indexOf(')')).trim();
        if (!items[itemGroup]) {
            items[itemGroup] = [];
        }
        items[itemGroup].push(itemName);
    }
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function loadItems() {
    var items = JSON.parse(localStorage.getItem('todoItems'));
    if (items) {
        var ul = document.getElementById("todo-list");
        ul.innerHTML = '';
        for (var group in items) {
            if (items.hasOwnProperty(group)) {
                for (var i = 0; i < items[group].length; i++) {
                    var li = document.createElement("li");
                    li.innerHTML = items[group][i] + ' (' + group + ') <button class="remove" onclick="removeItem(this)">X</button>';
                    ul.appendChild(li);
                }
            }
        }
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addItem();
    }
}



function filterGroups() {
    var filterValue = document.getElementById("filter-input").value.toUpperCase();
    var ul = document.getElementById("todo-list");
    var li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        var group = li[i].innerText.split('(')[1].split(')')[0].trim();
        if (group.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
