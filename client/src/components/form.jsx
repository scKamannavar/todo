import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import {motion, AnimatePresence } from 'framer-motion'


const form = ({formState, addTask}) => {
const [newtask, setNewTask] = useState('')

function handleClick(){
    if(newtask === ''){return}
    const newTaskObj = {
            id : uuidv4(),
            task : newtask,
            status : false
    }
    addTask(newTaskObj)
    setNewTask('')
}
  return (
    <AnimatePresence>
      <motion.div 
      key={formState}
      initial={{ opacity: 0, scale: 0.5, x:100 }}
      animate={{ opacity: 1, scale: 1, x:0}}
      transition={{type: "spring", duration: 0.5,}}
      exit={{ opacity: 0, scale: 0.5, x:100 }}
      className={`flex justify-center px-2 w-[80%] sm:w-[30%] text-slate-300 font-Montserrat align-bottom  ${formState?'block':'hidden'} fixed mb-6 sm:bottom-24  bottom-0 left-0 sm:left-[30%]`}>
          <div className='flex bg-white w-full rounded-xl h-16 text-slate-950 shadow-xl shadow-gray-600'>
              <input className='p-2 flex-1 rounded-full h-12 text-slate-950 outline-none ' type="text" name="addTodo" id="" value={newtask}   onChange={(e)=>setNewTask(e.target.value)} />
              <button className='bg-orange-600 h-full px-4 rounded-xl  text-white ' type="submit" onClick={handleClick}>Add</button>
          </div>       
      </motion.div>
    </AnimatePresence>
  )
}

export default form
