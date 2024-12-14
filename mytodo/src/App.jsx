import { useState, useId } from 'react'
import Todo from './Todo'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    add(input)
    setInput('')
  }
  function add(text) {
    setList((prev)=> [...prev,{id: Date.now() ,todo:text}])
  };

  function remove(id) {
    setList(list.filter((item)=> item.id !== id))
  }
  function update(id, text) {
    const newlist = list.map((item)=> item.id === id ?  {id, todo:text} : item)
    setList(newlist)
  }
  
  return (
    <>
      <div className='flex items-center justify-center h-[100vh] w-[100vw]' >
        <div className=' w-[50vw] bg-gray-600'>
          <form onSubmit={handleSubmit} className=' flex items-start justify-center gap-2 w-[100%]  p-5'>
            <input type="text" className='w-[100%] px-4 py-1 rounded-sm outline-none' 
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            />
            <button className='bg-sky-300 px-4 py-1 rounded-sm shadow-lg'>Submit</button>
          </form>
          <div className='h-[60vh]'>
            <Todo list={list} update={update} remove={remove} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
