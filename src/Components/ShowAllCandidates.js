import React, { useEffect, useState } from 'react'
import pdflogo from '../assets/image 1.png'
function  ShowAllCandidates() {

    const [AllCandidates,setAllCandidates]=useState([])

    useEffect(()=>{
        const AllCandidates=JSON.parse(localStorage.getItem('AllCandidates'))
        if(AllCandidates){
            const numAscending = [...AllCandidates].sort((a, b) => parseInt(b.score) - parseInt(a.score));
            setAllCandidates(numAscending)
        }
    },[])

  return (
    <div className='w-full h-screen flex justify-end pt-[18vh] font-font1 text-[#565656] '>
        <div className='w-[80vw] h-full pb-[4vh] pr-[5vw]'>
            <div className='w-full h-full flex flex-col space-y-[2vh] '>
                <text class='text-xl font-medium'>Top Candidates</text>
                <div class='w-full h-full bg-[#F8FAFF] rounded-xl px-[3vh] py-[3vh]'>
                    <div class='w-full flex justify-between p-[2vh]'>
                        <text class='w-[2vw] text-center font-bold'>No.</text>
                        <text class='w-[10vw] text-center font-bold'>Name</text>
                        <text class='w-[10vw] text-center font-bold'>Number</text>
                        <text class='w-[10vw] text-center font-bold'>Email</text>
                        <text class='w-[10vw] text-center font-bold'>Experience</text>
                        <text class='w-[5vw] text-center font-bold'>Score</text>
                    </div>
                    {
                        AllCandidates.map((obj,index)=>
                            <div class={`w-full flex items-center justify-between p-[2vh] rounded-xl ${index%2==0?'bg-white':''}`}>
                                <text class='w-[2vw] text-center'>{index+1}.</text>
                                <text class='w-[10vw] text-center'>{obj.name}</text>
                                <text class='w-[10vw] text-center'>{obj.phone}</text>
                                <text class='w-[10vw] text-center'>{obj.email}</text>
                                <text class='w-[10vw] text-center'>{obj.years}</text>
                                <text class='w-[5vw] text-center'>{obj.score}%</text>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowAllCandidates