import React, { useState, useEffect } from 'react';
import ItemService from '../api/ItemService';

const ItemForm = ({ onAddItem, itemToEdit, onUpdateItem }) => {
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: '',
        availability: false,
    });

    // Si recibimos un ítem para editar, lo cargamos en el formulario
    useEffect(() => {
        if (itemToEdit) {
            setItem(itemToEdit);
        }
    }, [itemToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        setItem({
            ...item,
            availability: e.target.checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del producto antes de enviar:', item);  // Verificar el valor de availability
        if (itemToEdit) {
            // Si estamos editando un ítem, lo actualizamos
            ItemService.updateProduct(item.id, item)
                .then(response => {
                    console.log('Producto actualizado', response.data);
                    setItem({ name: '', description: '', price: '', availability: false });
                    onUpdateItem();  // Recargar la lista después de editar
                })
                .catch(error => {
                    console.error('Error actualizando el producto', error);
                });
        } else {
            // Si es un nuevo ítem, lo creamos
            ItemService.createProduct(item)
                .then(response => {
                    console.log('Producto creado', response.data);
                    setItem({ name: '', description: '', price: '', availability: false });
                    onAddItem();  // Recargar la lista después de agregar
                })
                .catch(error => {
                    console.error('Error creando el producto', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripción:</label>
                <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Disponible:</label>
                <input
                    type="checkbox"
                    name="availability"
                    checked={item.availability}
                    onChange={handleCheckboxChange}
                />
            </div>
            <button type="submit">{itemToEdit ? 'Actualizar Producto' : 'Agregar Producto'}</button>
        </form>
    );
};

export default ItemForm;
