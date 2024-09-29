import React, { useState, useEffect } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import ItemService from './api/ItemService';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const loadItems = () => {
    ItemService.getAllProducts()
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching items", error);
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAddItem = () => {
    loadItems();
  };

  const handleEditItem = (item) => {
    setItemToEdit(item);  
  };

  const handleUpdateItem = () => {
    loadItems();
    setItemToEdit(null);  // Limpiar el formulario después de editar
  };

  const handleDeleteItem = (itemId) => {
    ItemService.deleteProduct(itemId)
      .then(response => {
        console.log('Producto eliminado');
        loadItems();  // Recargar la lista después de eliminar
      })
      .catch(error => {
        console.error('Error eliminando el producto', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Inventario</h1>
        <ItemForm 
          onAddItem={handleAddItem} 
          itemToEdit={itemToEdit} 
          onUpdateItem={handleUpdateItem} 
        />
        <h2>Lista de Ítems</h2>
        <ItemList 
          items={items} 
          onEdit={handleEditItem} 
          onDelete={handleDeleteItem}  // Pasar la función de eliminar
        />
      </header>
    </div>
  );
}

export default App;


