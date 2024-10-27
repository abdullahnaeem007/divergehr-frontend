import React from 'react'
import {BsMoon, BsSearch} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'

function Navbar() {
  return (
    <div class='w-full h-fit fixed top-0 flex justify-end  font-font1'>
        <div class='w-[80vw] h-fit flex space-x-[2vw] pr-[5vw] py-[4vh]'>
            <div class='w-full h-fit flex items-center  px-[1.5vw] py-[1vh] space-x-[1.5vw] rounded-lg border-[1px] border-[#BB9753]' >
                <BsSearch size='1.5rem' color='#BB9753'/>
                <input class='w-full h-[6vh] bg-transparent outline-none text-lg text-[#BB9753] placeholder-[#BB9753]' placeholder='Search chat'/>
            </div>
            <button class='w-fit flex justify-center items-center border-[1px] border-[#479CDE] px-[1.3vw] rounded-xl'>
                <BsMoon size='1.6rem' color='#479CDE'/>
            </button>
            <button class='w-fit flex justify-center items-center border-[1px] border-[#479CDE] px-[1.3vw] rounded-xl'>
                <FiSettings size='1.6rem' color='#479CDE'/>
            </button>
        </div>
    </div>
  )
}

export default Navbar