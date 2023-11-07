document.addEventListener('DOMContentLoaded', loadItems);

function loadItems() {
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            const listElement = document.getElementById('lista');
            listElement.innerHTML = ''; // Clear the list before repopulating it
            data.forEach((item) => {
                const listItem = document.createElement('li');
                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.value = item.text;
                textInput.onkeyup = (event) => changeItem(event, item.id);

                const removeLink = document.createElement('span');
                removeLink.textContent = 'Remove';
                removeLink.classList.add('remove-link');
                removeLink.onclick = () => removeItem(item.id);

                listItem.appendChild(textInput);
                listItem.appendChild(removeLink);
                listElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addItem() {
    const newItemInput = document.getElementById('new-item');
    const text = newItemInput.value.trim();
    if (text) {
        fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        })
        .then(response => response.json())
        .then(() => {
            newItemInput.value = '';
            loadItems(); // Reload the list to show the new item
        })
        .catch((error) => console.error('Error:', error));
    }
}

function removeItem(id) {
    fetch(`/items/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // sau return response.json() dacă serverul trimite înapoi un JSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(() => {
        loadItems(); // Reload the list to reflect the changes
    })
    .catch((error) => console.error('Error:', error));
}