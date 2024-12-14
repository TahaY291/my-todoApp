import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Todo({ list, remove, update }) {
  const [editId, setEditId] = useState(null);  // Track the todo being edited
  const [text, setText] = useState("");         // Handle the input value

  // Function to start editing
  function startEdit(id, currentText) {
    setEditId(id);          // Set the id of the todo being edited
    setText(currentText);   // Initialize the input with the current todo text
  }

  // Function to save the updated text
  function saveUpdate(id) {
    update(id, text);       // Call update to change the todo
    setEditId(null);        // Exit edit mode
    setText("");            // Clear the text state
  }

  return (
    <div>
      {
        list.map((item) => {
          let { id, todo } = item;
          return (
            <div key={id} className='flex items-center justify-between pl-8 px-6 py-2'>
              <p className='text-white text-lg capitalize'>
                {
                  editId === id 
                  ? <input 
                  className='bg-gray-600'
                      type='text' 
                      placeholder='red'
                      value={text} 
                      onChange={(e) => setText(e.target.value)} // Update text state as you type
                    />
                  : todo
                }
              </p>
              <div className='flex items-center justify-center gap-2'>
                {
                  editId === id
                  ? <button onClick={() => saveUpdate(id)} className='px-2 py-1 bg-yellow-300 rounded-sm shadow-lg'>Save</button>
                  : <button onClick={() => startEdit(id, todo)} className='px-2 py-1 bg-yellow-300 rounded-sm shadow-lg'><FaEdit /></button>
                }
                <button onClick={() => remove(id)} className='px-2 py-1 text-white bg-red-400 rounded-sm shadow-lg'><MdDelete /></button>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default Todo;
