import React, { useEffect, useState } from 'react'
import logo from '../assets/Group 1.png'
import pdflogo from '../assets/image 1.png'
import {AiOutlineClockCircle, AiOutlinePlus,AiOutlineSave} from 'react-icons/ai'
import {BsFillPeopleFill} from 'react-icons/bs'
import Swal from 'sweetalert2'
import AppLogo from '../assets/DivergeHR.png'
import { json } from 'react-router-dom'

function SideBar() {

    const [Candidates,setCandidates] = useState([])

    async function NewCandidateFunction(){
        const { value: CandidateName } = await Swal.fire({
            title: 'Enter your Candidate Name',
            input: 'text',
            inputLabel: 'Your Candidate Name',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to write something!'
              }
            }
          })
          
          if (CandidateName) {
            // const NewCandidate= {name:CandidateName,time:dateTime}
            // setCandidates(obj=>[...obj,NewCandidate])
            localStorage.removeItem('SelectedSavedCandidate')
            const PreviousName=JSON.parse(localStorage.getItem('CurrentCandidate'))
            if(PreviousName){
                localStorage.removeItem('CurrentCandidate')
                localStorage.removeItem('CandidateInfo')
                localStorage.removeItem('CandidateInfo2')
                localStorage.removeItem('GptArr')
                localStorage.removeItem('CandidateScore')
            }

            localStorage.setItem('CurrentCandidate',JSON.stringify(CandidateName))
            window.location.replace('/add')
          }
    }

    function SaveCandidate(){
        const name=JSON.parse(localStorage.getItem('CurrentCandidate'))
        const resume = JSON.parse(localStorage.getItem('CandidateInfo'));
        const job_description = JSON.parse(localStorage.getItem('CandidateInfo2'));
        const gptarr=JSON.parse(localStorage.getItem('GptArr'))
        const score=JSON.parse(localStorage.getItem('Percentage5'))
        const email=JSON.parse(localStorage.getItem('email'))
        const phone=JSON.parse(localStorage.getItem('phone'))
        const years=JSON.parse(localStorage.getItem('years'))
        const Percentage1=JSON.parse(localStorage.getItem('Percentage1'))
        const Percentage2=JSON.parse(localStorage.getItem('Percentage2'))
        const Percentage3=JSON.parse(localStorage.getItem('Percentage3'))
        const Percentage4=JSON.parse(localStorage.getItem('Percentage4'))
        const TStrength=JSON.parse(localStorage.getItem('TStrength'))
        const BStrength=JSON.parse(localStorage.getItem('BStrength'))
        const CStrength=JSON.parse(localStorage.getItem('CStrength'))
        const BImp=JSON.parse(localStorage.getItem('BImp'))
        const CImp=JSON.parse(localStorage.getItem('CImp'))
        const TImp=JSON.parse(localStorage.getItem('TImp'))

        if(name && resume && job_description && gptarr && score && Percentage1 && Percentage2 && Percentage3 && Percentage4 && TStrength &&BStrength &&CStrength &&BImp &&TImp &&CImp){
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
           
            const SavingCandidate={name:name,resume:resume,job_description:job_description,gptarr:gptarr,score:score,time:dateTime,email:email,phone:phone,years:years,Percentage1:Percentage1,Percentage2:Percentage2,Percentage3:Percentage3,Percentage4:Percentage4,TStrength:TStrength,TImp:TImp,BStrength:BStrength,BImp:BImp,CStrength:CStrength,CImp:CImp}
            const AllCandidates=JSON.parse(localStorage.getItem('AllCandidates'))

            localStorage.clear()

            if(AllCandidates){
                AllCandidates.push(SavingCandidate)
                localStorage.setItem('AllCandidates',JSON.stringify(AllCandidates))
            }
            else{
                const NewAllCandidates=[]
                NewAllCandidates.push(SavingCandidate)
                localStorage.setItem('AllCandidates',JSON.stringify(NewAllCandidates))
            }

            window.location.replace('/')
        }
        else{
            Swal.fire({
                icon:'warning',
                title:'Insufficient Information',
                text:'Kindly provide the files, complete the interview and access report and evaluation'
            })
        }
    }

    function CheckGptArray(){
        const name=JSON.parse(localStorage.getItem('CurrentCandidate'))
        const resume = JSON.parse(localStorage.getItem('CandidateInfo'));
        const job_description = JSON.parse(localStorage.getItem('CandidateInfo2'));
        const arr=JSON.parse(localStorage.getItem('GptArr'))
        if(arr && name && resume && job_description){
            Swal.fire({
                icon:'success',
                text:'Record found in data',
                showConfirmButton:true,
                showCancelButton:true
            }).then(function(result){
                if(result.isConfirmed){
                    window.location.replace('/report')
                }
            })
        }
        else
        {
            Swal.fire({
                icon:'error',
                text:'Report of Inerview not found in data',
                showConfirmButton:true,
                showCancelButton:true
            })
        }
    }

    function ShowTopCandidates(){
        window.location.replace('/TopCandidates')
    }

    useEffect(()=>{
        const AllCandidates= JSON.parse(localStorage.getItem('AllCandidates'))
        if(AllCandidates){
            setCandidates(AllCandidates)
        }
    },[])

    function SavedCandidateReport(obj){
        localStorage.setItem('SelectedSavedCandidate',JSON.stringify(obj))
        window.location.replace('/report')
    }

  return (
    <div class='w-[20vw] h-screen fixed top-0 px-[2vw] py-[4vh] font-font1 text-[#565656]'>
        <div class='w-full h-full flex flex-col justify-between '>
            <div class='flex flex-col space-y-[6vh] border-r-[1px]'>
                <img src={AppLogo} class='w-5/6' alt=""/>
                <div class='flex flex-col space-y-[1vh]'>
                    <button onClick={NewCandidateFunction} class='w-full h-fit flex items-center px-[2vh] py-[1.5vh] space-x-[2vw] border-[1px] border-[#BB9753] rounded-lg'>
                        <AiOutlinePlus size='1.2rem' color='#BB9753'/>
                        <text class='font-bold text-[#BB9753] text-sm'>New Candidate</text>
                    </button>
                    <button onClick={SaveCandidate} class='w-full h-fit flex items-center px-[2vh] py-[1.5vh] space-x-[2vw] border-[1px] border-[#3994FE] rounded-lg'>
                        <AiOutlineSave size='1.2rem' color='#3994FE'/>
                        <text class='font-bold text-[#3994FE] text-sm'>Save Candidate</text>
                    </button>
                    <button onClick={ShowTopCandidates} class='w-full h-fit flex items-center px-[2vh] py-[1.5vh] space-x-[2vw] border-[1px] border-[#ED676A] rounded-lg'>
                        <BsFillPeopleFill size='1.2rem' color='#ED676A'/>
                        <text class='font-bold text-[#ED676A] text-sm'>Top Candidates</text>
                    </button>
                </div>
                <div class='flex flex-col w-full h-[35vh] space-y-[2vh] overflow-y-scroll'>
                    <text>Previous Candidates</text>
                    {
                        Candidates.map(obj=>
                            <button onClick={()=> SavedCandidateReport(obj)} class='w-full h-fit flex flex-col space-y-[1vh] bg-[#3994FE]/20 px-[2vh] py-[1vh] rounded-lg'>
                                <div class='flex space-x-[1vh] items-center'>
                                    <img src={pdflogo} class='w-[1.2vw] h-fit' alt=""/>
                                    <text class='font-medium'>{obj.name}</text>
                                </div>
                                <div class='flex space-x-[1vh] items-center'>
                                    <AiOutlineClockCircle class='w-[1.2vw] h-fit'/>
                                    <text class='font-medium'>{obj.time}</text>
                                </div>
                            </button>
                        )
                    }
                </div>
            </div>
            <div class='w-full flex flex-col items-center bg-[#3994FE] text-white rounded-xl py-[2vh] px-[1vw] space-y-[1vh]'>
                <text>Access Interview Results</text>
                <button onClick={CheckGptArray} class='w-full py-[1vh] border-[1px] border-white rounded-xl'>Report and Evaluation</button>
            </div>
            
        </div>
    </div>
  )
}

export default SideBar