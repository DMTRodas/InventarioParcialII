import React from 'react';

const ItemList = ({ items, onEdit, onDelete }) => {  // Recibe la función onDelete como prop
    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description} - {item.price} USD - 
                        {item.availability ? 'Disponible' : 'No disponible'}
                        <button onClick={() => onEdit(item)}>Editar</button>  {/* Botón para editar */}
                        <button onClick={() => onDelete(item.id)}>Eliminar</button>  {/* Botón para eliminar */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;

