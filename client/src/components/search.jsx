import React, { useState, useEffect } from 'react'

const search = ({completed, taskData, setTaskData}) => {
const [searchelement, setSearchelement] = useState('')
// console.log('in search : ',taskData)


//  const searchhandeler = (e)=>{
//     setSearchelement(e.target.value)
//     console.log(searchelement)
//     // const searcheddata = taskData.filter(t => {
//     // //    console.log(t)
//     //    return t.task.toLowerCase().includes(searchelement.toLowerCase());
//     //  })

//  } 
 useEffect(() => {
    setTaskData(taskData.filter(t => {
        return t.task.toLowerCase().includes(searchelement.toLowerCase());
      }))//Calling setter here to update
  }, [searchelement]);
//   )
//   taskData = searcheddata
  return (      
    <div className='flex flex-col justify-center border-2x h-[100px] shadow-xl bg-slate-50 left-0 right-0 top-0  w-full fixed '>
      <div className='flex justify-center'>
        <input className='h-[40px] w-full' type="text" name="" id="" onChange={(e)=>setSearchelement(e.target.value)} />
      </div>
      <div className='flex justify-center'>
        <h1>Completed tasks : {completed}</h1>
      </div>
      <div className='flex justify-center px-2 '>
            <div>Categiry 1</div>
            <div>Categiry 2</div>
            <div>Categiry 3</div>
            <div>Categiry 4</div>
      </div>
    </div>
  )
}

export default search
