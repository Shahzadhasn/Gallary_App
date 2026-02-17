import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'


function App() {
  const [imageData, setImageData] = useState([])
   const [index, setindex] = useState(1)
  const getdata=async ()=>{
    const res=await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=14`)
    setImageData(res.data)
    console.log(res.data);
    
  }
  useEffect(() => {
    getdata()
  }, [index])
 
let printUserData=<h3 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>Loading....</h3>
if(imageData.length>0){
  printUserData=imageData.map(function(elem,idx){
    return (
    <div key={idx}>
      <a href={elem.url}>
        <div className='h-40 w-44 overflow-hidden rounded-xl bg-white'>
          <img className='h-full w-full object-cover ' src={elem.download_url} target="_blank"/>
        </div>
        <h3>{elem.author}</h3>
      </a>
        
    </div>
    );
  })
}
 
return (
   <div className='bg-black h-screen text-white overflow-auto'>
    
   <div className='flex flex-wrap gap-4 p-2 h-[82%] '>{printUserData}</div>
   <div className='flex justify-center gap-6 items-center p-4  '>
    <button onClick={()=>{
      if(index>1){
        setImageData([])
      setindex(index-1)
     
      }
    }} className='bg-amber-500 px-4 py-2 rounded text-black cursor-pointer active:scale-95'>Prev</button>
    <h3>Page {index}</h3>
    <button onClick={()=>{
      setImageData([])
        setindex(index+1)

      
    }}  className='bg-amber-500 px-4 py-2 rounded text-black cursor-pointer active:scale-95'>Next</button>
   </div>
   </div>
  )
}

export default App
