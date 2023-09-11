import React, { useEffect, useState } from 'react'
import tasks from './data/tasks'
import Form from './form'
import Search from './search'
import {motion, AnimatePresence } from 'framer-motion'

const Todo = () => {
    var storedTaskData = localStorage.getItem('taskData');
    console.log('storedTaskData data',storedTaskData)
     if (storedTaskData == null) {
       localStorage.setItem('taskData', JSON.stringify([]));
     }
    
    const [task, setTask] = useState(JSON.parse(storedTaskData))
    // const [task, setTask] = useState(tasks)
    const [formvisi, setFormvisi] = useState(false)    
    const [completedtask, setCompletedtask] = useState(0)
    const [searchelement, setSearchelement] = useState('')
    const [filterelement, setFilterelement] = useState('all')

    useEffect(() => {
        localStorage.setItem('taskData', JSON.stringify(task));
  },[task]);

    function handleClick(id){
        console.log('inside handle', id)
        setTask(task.map((t)=>{
            if(id === t.id) {return {...t, status:!t.status} }
            return t
        }) )   
    }

    function handleDelete(id){
        console.log('delete',id)
        setTask( task.filter((t)=>t.id !== id)
        )
    }

    function addTask(newTask){
        const updatedTasks = {...task,newTask}
        setTask([...task,newTask])
    }

    useEffect(() => {
        setCompletedtask(task.filter((ct)=> ct.status === true).length)   
      }
      );

   
      

        function handleFilter(arg){
            setFilterelement(arg)
            console.log(filterelement)
        }
        var commonElements
        var searchedList
        var filteredList

        searchedList = task.filter(t => {
            return t.task.toLowerCase().includes(searchelement.toLowerCase());
          })//Calling setter here to update
        //   console.log('searched List', searchedList)

        if(filterelement == 'all'){
            commonElements = searchedList
            console.log('co', commonElements)
        }
        else{  
             filteredList = task.filter(t => {
                return t.status == filterelement
              })
            //   console.log('filtered list', filteredList)

              commonElements = filteredList.filter(item1 =>
                searchedList.some(item2 => item2.id === item1.id) //Different one
                // searchedList.includes(item1)
              );
              console.log('Final filtered list', commonElements)
        }


  return (
    <div className='flex justify-center relative'>
       <div className='flex justify-start relative p-2 px-30 pb-20 flex-col h-full w-full min-h-screen  bg-white  '>
            {/* <Search completed ={completedtask} taskData={task} setTaskData ={setTask}/> */}
            <div className='flex flex-col z-50 justify-between  border-2x h-fit shadow-xl bg-blue-300 left-0 right-10 top-0 pt-0 px-2 w-full fixed '>
                <div className='flex font-Outfit font-bold text-xl justify-center py-2'>
                    <h3>PLAN YOUR DAY😊</h3>
                </div>
                <div className='flex justify-center px-4'>
                    <input className='h-[45px] sm:w-[50%] px-4 py-2 w-full rounded-full' type="text" placeholder='Search' name="" id="" onChange={(e)=>setSearchelement(e.target.value)} />
                </div>
                <div className='flex justify-around px-2 lg:px-96 '>
                        <div className={`${filterelement == 'all'? 'border-b-2 border-black':'' } text-md font-Montserrat`}><button className='py-2' onClick={()=>handleFilter('all')} >All <span className='p-1 bg-blue-400 rounded-full text-white'>{task.length}</span></button></div>
                        <div className={`${filterelement == true? 'border-b-2 border-black':'' } text-md font-Montserrat`}><button className='py-2' onClick={()=>handleFilter(true)} >Finsished <span className='p-1 bg-green-400 rounded-full text-white'>{completedtask}</span></button></div>
                        <div className={`${filterelement == false? 'border-b-2 border-black':'' } text-md font-Montserrat`}><button className='py-2' onClick={()=>handleFilter(false)} >Pending<span className='p-1 bg-red-400 rounded-full text-white'>{task.length-completedtask}</span></button></div>
                </div>
            </div>
            <motion.div 
             className='pt-[130px] sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4 h-full'>
                {commonElements.slice(0).reverse().map((t)=>  //{searchedList.slice(0).reverse().map((t)=> 
                    
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5  }}
                            transition={{type: "spring", duration: 0.5 }}
                            
                             key={t.id} 
                             className={` ${t.status ? 'bg-slate-300 text-slate-400 shadow-none sm:justify-center ':'bg-slate-600  shadow-xl shadow-zinc-600 '} flex mt-6 p-4 text-slate-100 rounded-md list-none `}>
                           <motion.div  className='flex-1'>
                                <li>{t.task} </li>
                            </motion.div>
                            <div className='sm:flex sm:flex-col sm:gap-2'>
                                <button className={` ${ t.status ?'bg-blue-500':'bg-green-400'} sm:hover:bg-green-500 p-2 mr-2 sm:mr-0 sm:bg-none rounded-md `} onClick={()=>handleClick(t.id)}>{`${t.status?'↩️':'✅'}`} </button>
                                <button className='bg-red-400 p-2 rounded-md hover:bg-red-500' onClick={()=>handleDelete(t.id)}> 🗑️</button>
                            </div>
                        </motion.div>
                    
                )}
            </motion.div>

            
            <div className='flex justify-center align-middle mr-6 mb-6 fixed w-12 h-12 rounded-full bg-blue-700 shadow-sm shadow-white text-white bottom-0 right-0  sm:left-[48%]'>
               <button className={`${formvisi? 'rotate-45':''} transition-all duration-100`} onClick={()=>setFormvisi(!formvisi)}>
                <span className={`fill-white `}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                </span>
               </button>
            </div>
            <Form formState={formvisi} addTask={addTask}/>
           
           
      </div>
    </div>
  )
}

export default Todo
