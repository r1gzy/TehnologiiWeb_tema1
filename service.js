const fs = require('fs').promises;

const itemPath = "items.json"; //calea catre fisierul json in  care sunt salvate fisierele din lista

async function loadItems(path) {
    try {
      const data = await fs.readFile(path);
      return JSON.parse(data);
    } catch (error) {
      console.error('Eroare la încărcarea elementelor', error);
      throw error;
    }
  }

async function storeItems(items, path) {
    try {
      const data = JSON.stringify(items, null, 2);
      await fs.writeFile(path, data);
    } catch (error) {
      console.error('Eroare la salvarea elementelor', error);
      throw error;
    }
  }

  // Metoda pentru schimbarea unui element
async function changeItem(id, newItem) {
    let items = await loadItems(itemsPath);
    const index = items.findIndex(item => item.id === id);
  
    if (index !== -1) {
      items[index] = newItem;
      await storeItems(items, itemsPath);
    } else {
      throw new Error('Elementul nu a fost găsit.');
    }
  }

  async function removeItem(id) {
    let items = await loadItems(itemPath);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        await storeItems(items, itemPath);
    } else {
        throw new Error('Elementul nu a fost găsit.');
    }
}

module.exports = {
    loadItems,
    storeItems,
    changeItem,
    removeItem 
};
