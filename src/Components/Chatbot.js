import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineSend} from 'react-icons/ai'
import {FaMicrophone} from 'react-icons/fa'

import botlogo from '../assets/botlogo.png'
import userlogo from '../assets/userlogo.png'

import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import Swal from 'sweetalert2'

function Chatbot() {

    const [ParsedData,setParsedData]=useState('')
    const [ChatArr,setChatArr]=useState([])

    const [FirstTime,setFirstTime]=useState(false)
    const [CurrentInput,setCurrentInput]=useState('')
    const [StreamResponse,setStreamResponse]=useState('')
    const [StreamCheck,setStreamCheck]=useState(false)

    const [EndOfChat,setEndOFChat]=useState(false)
    const [CurrentCandidate,setCurrentCandidate]=useState('')
    const EndRef=useRef()

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    if(!browserSupportsSpeechRecognition){
      Swal.fire({
        icon:'warning',
        title:'Speech to text disabled',
        text:'Your browser does not support speech to text functionality'
      })
    }

    const [Listening,setListening]=useState(false)
    const [VoiceInput,setVoiceInput]=useState('')

    function VoiceToText(){
      if(Listening==false){
        setListening(true)
        SpeechRecognition.startListening()
      }
      else if(Listening==true){
        setListening(false)
        SpeechRecognition.stopListening()
        setChatArr(obj=>[...obj,{role:'user',content:transcript}])
        resetTranscript()
      }
    }

    useEffect(()=>{
      if(FirstTime==false)
      {
        const items = JSON.parse(localStorage.getItem('CandidateInfo'));
        const items2 = JSON.parse(localStorage.getItem('CandidateInfo2'));
        if (items && items2) {
          setParsedData(items);

          setChatArr(obj=>[...obj,{role:'assistant',content:`Take a deep breath, and act as a professional hiring manager. Evaluate the following candidate based on three metrics: \n
        1- Technical Competence & Skill Set
         2- Behavioral & Cultural Fit
         3- Communication & Interpersonal Skills. \n
         IMPORTANT NOTE: YOU ACT AS THE HIRING MANAGER AND THE USER IS THE CANDIDATE \n
         You have been provided with a job description and the resume of the candidate with whom you will chat. Use this information of job description: ${JSON.stringify(items2)}. Use this information of Candidates resume: ${JSON.stringify(items)}. You will ask technical questions from the candidate which are LONG and PROFESSIONAL and DERIVED FROM THE 3 METRICS ABOVE. That question should also relate to the provided data of Job description and candidates resume. \n
          In the beginning, you will start with an introduction question like EAMPLE: : Welcome, and thank you for taking the time to meet with us today! We're excited to learn more about you and discuss the opportunity here at [Company Name from Job Description]. Our goal for this interview is to understand your experiences, aspirations, and how they align with our team and mission. Are you ready?' \n
          Then the candidate will give answer to the introduction question.\n
          After the candidate gives reply to the introduction question, you will ask the candidate a personal question like EXAMPLE: t: To start with the interview please provide your Full Name, Age, and Date of birth. \n
          Then the candidate will give answer to the personal question\n
          After the candidate gives reply to the personal question, you will generate all together 5 technical questions for interview but you will ask the user a single question at a time. You will ask the 5 questions one by one meaning, you will ask 1 question and then wait for the user to answer that question and the process repeats 5 times until all 5 questions are asked by you and their awaited answers are told by the user. \n
          In the end after 5 questions by you and their answers by user are completed, you will conclude the interview by saying like EXAMPLE: Thank you for your responses. We'll be in touch soon with feedback.Have a great day!. \n
          Be Professional as you are taking an interview. \n
          IMPORTANT NOTE: FOR EACH QUESTION, YOU HAVE TO WAIT FOR THE CANDIDATES RESPONSE BEFORE MOVING TO THE NEXT QUESTION.`}])
          
          setChatArr(obj=>[...obj,{role:'user',content:'I am ready for the interview lets begin'}])
        }
        setFirstTime(true)
      }
    },[])

    useEffect(()=>{
      if(ChatArr.length>1 && ChatArr[ChatArr.length-1].role=='user'){
        setCurrentInput('')
        setStreamCheck(true)
        ResponseFromGpt()
      }

      EndRef.current?.scrollIntoView({
        behavior:'smooth',
        block:'end'
      })
      console.log(ChatArr)
      localStorage.setItem('GptArr',JSON.stringify(ChatArr))
    },[ChatArr])

    async function ResponseFromGpt(){
      const res=await fetch('https://divergehr-backend.onrender.com/chatStream',{
          method:'POST',
          body:JSON.stringify({gptarr:ChatArr}),
          headers: {
              'Content-Type': 'application/json',
          },
        })

        const reader=res.body.getReader()
        const decoder=new TextDecoder();
        let temp=''
        let solution=''

        
        while(true)
        {
          const {done,value}= await reader.read()
          if (done) break;

          const chunk = decoder.decode(value,{stream:true})
          
          if(chunk.includes('STREAM_FINISHED'))
          {
            break
          }
          else
          {
            solution+= chunk
            setStreamResponse(solution)
          }
        }
        // console.log(solution)
        setChatArr(obj=>[...obj,{role:'assistant',content:solution}])
        setStreamResponse('')
        setStreamCheck(false)
    }

    useEffect(()=>{
      const CurrentCandidate=JSON.parse(localStorage.getItem('CurrentCandidate'))
      const items = JSON.parse(localStorage.getItem('CandidateInfo'));
      const items2 = JSON.parse(localStorage.getItem('CandidateInfo2'));
      if(CurrentCandidate && items && items2){
        setCurrentCandidate(CurrentCandidate)
      }
      else if( CurrentCandidate){
        window.location.replace('/add')
      }
      else{
        window.location.replace('/')
      }
    },[])

    const [ResponseArr,setResponseArr]=useState('')
    const [FirstTime3,setFirstTime3]=useState(false)
  
    useEffect(()=>{
        if(FirstTime3==false)
        {
          const items = JSON.parse(localStorage.getItem('CandidateInfo'));
          
            setResponseArr(obj=>[...obj,{role:'user',content:`Use this knowledge : ${JSON.stringify(items)} \n
            The provided data is the resume of the candidate. TOU HAVE TO EXTRACT PHONE NUMBER, EMAIL, YEARS OF EXPERIENCE. \n
            IMPORTANT: You will give the response of this message ONLY in the following format: [email]\n[phone number]\n[years of experience]\n `}]) 
        }
        setFirstTime3(true)
    },[])
  
    useEffect(()=>{
      if(ResponseArr.length==1)
      {
        ResponseFromGpt3()
      }
    },[ResponseArr])
  
    async function ResponseFromGpt3(){
        const res=await fetch('https://divergehr-backend.onrender.com/chat',{
            method:'POST',
            body:JSON.stringify({gptarr:ResponseArr}),
            headers: {
                'Content-Type': 'application/json',
            },
          })
  
        const sol = await res.json()
        console.log(sol.text)
        if(sol.text){

          var str=sol.text
         
          const temp1=str.content.indexOf('\n')
          const temp2=str.content.indexOf('\n',temp1+1)
          console.log(temp1+" "+temp2)

          var email=str.content.substring(0,temp1)
          var phone=str.content.substring(temp1+1,temp2)
          var years=str.content.substring(temp2+1,sol.text.content.length-1)

          var check=false
          var YEARS=''
          for(var i=0;i<years.length;i++)
          {
            if(years[i]>='0' && years[i]<='9')
            {
              YEARS=YEARS+years[i]
              check=true
            }
            else if(check==true)
            {
              break
            }
          }

          localStorage.setItem('email',JSON.stringify(email))
          localStorage.setItem('phone',JSON.stringify(phone))
          localStorage.setItem('years',JSON.stringify(YEARS))

          setResponseArr(obj=>[...obj,sol.text])
        }
    }


  return (
    <div className='w-full h-screen flex justify-end pt-[18vh] font-font1 text-[#565656] '>
      <div className='w-[80vw] h-full  pb-[4vh] pr-[5vw]'>
        <div class='w-full h-full flex flex-col bg-[#F4F4F4] rounded-xl px-[5vh] py-[3vh] space-y-[3vh]'>
          <div class='w-full h-[90vh] overflow-y-auto space-y-[5vh] pb-[3vh]'>
            {
              ChatArr.length>0?
                ChatArr.map((obj,index)=>
                  <div class='w-full h-fit'>
                    {
                      obj.role=='assistant' && index>1?
                        <div class='flex space-x-[2vw] '>
                          <img src={botlogo} class='w-[2.5vw] h-fit'/>
                          <div class='px-[1vw] py-[1vh] bg-white rounded-xl shadow-md whitespace-pre-wrap'>{obj.content}</div>
                        </div>
                      :
                        [
                          obj.role=='user' && index>1?
                            <div class='flex space-x-[2vw] '>
                              <img src={userlogo} class='w-[2.5vw] h-fit'/>
                              <div class='px-[1vw] py-[1vh] bg-white rounded-xl shadow-md'>{obj.content}</div>
                            </div>
                          :
                          <></>
                        ]
                    }
                  </div>
                )
              :
              <></>
            }
            {
              Listening==true?
              <div class='w-full h-fit'>
                <div class='flex space-x-[2vw] '>
                  <img src={userlogo} class='w-[2.5vw] h-fit'/>
                  <div class='px-[1vw] py-[1vh] bg-white rounded-xl shadow-md'>{transcript}</div>
                </div>
              </div>
              :
              <></>
            }
            {
              StreamCheck==true?
              <div class='w-full h-fit'>
                <div class='flex space-x-[2vw] '>
                  <img src={botlogo} class='w-[2.5vw] h-fit'/>
                  <div class='px-[1vw] py-[1vh] bg-white rounded-xl shadow-md whitespace-pre-wrap'>{StreamResponse}</div>
                </div>
              </div>
              :
              <></>
            }
            <div ref={EndRef}></div>
          </div>
          {
            EndOfChat==false?
            <div class='w-full h-fit flex  items-center  px-[1.2vw] py-[0.5vh] space-x-[2vw] rounded-lg border-[1px] bg-white shadow-md' >
              <input onKeyDown={(e)=>{if(e.key==='Enter'){setChatArr(obj=>[...obj,{role:'user',content:CurrentInput}])}}} onChange={(e)=>{setCurrentInput(e.target.value)}}  class='w-full h-[6vh]  outline-none ' placeholder='Type your answer here' value={CurrentInput} />
              <FaMicrophone onClick={VoiceToText} class='hover:bg-gray-300 p-[1vh] rounded-xl cursor-pointer' size='2.3rem' color='#3994FE'/>
              <AiOutlineSend  onClick={()=>{setChatArr(obj=>[...obj,{role:'user',content:CurrentInput}])}}  class='cursor-pointer hover:bg-gray-300 p-[1vh] rounded-xl' size='2.3rem' color='#3994FE'/>
            </div>
            :
            <></>
          }
        </div>
      </div>
    </div>
  )
}

export default Chatbot