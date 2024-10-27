import React, { useEffect, useState } from 'react'
import uploadImg from '../assets/upload.png'
import './AddResume.css'
import pdflogo from '../assets/image 1.png'
import { AiOutlineLoading } from 'react-icons/ai'

function AddResume() {

  const [FileType, setFileType] = useState([]);
  const [CurrentCandidate,setCurrentCandidate]=useState('')

  const [UrlData,setURLData]=useState('')
  const [UrlArr,setUrlArr]=useState([])

  const [Loading,setLoading]=useState(false)

  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1048576) { // Less than 1 MB
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / 1048576).toFixed(2) + ' MB';
    }
  }

  async function ResumeSubmission() {
    if (FileType !== '') {
      setLoading(true)
      for(var i=0;i<FileType.length;i++)
      {
        try {
          const response = await fetch('https://divergehr-backend.onrender.com/pdfParser', {
            method:'POST',
            body:FileType[i],
            headers: 
            {
              'Content-Type': 'application/pdf',
            },
          });

          const sol = await response.json()
          const parsedData=sol.text

          setLoading(false)

          if(i==0){
            localStorage.setItem('CandidateInfo',JSON.stringify(parsedData))
          }
          else{
            localStorage.setItem('CandidateInfo2',JSON.stringify(parsedData))
            window.location.replace('/chatbot')
          }
          
          // Handle the e.xtracted text on the frontend as needed
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }
  
  

  useEffect(() => {
    if (FileType !== '') {
      for(var i=0;i<FileType.length;i++)
      {
        console.log(FileType[i])
      }
    }
  }, [FileType]);

  useEffect(()=>{
    const CurrentCandidate=JSON.parse(localStorage.getItem('CurrentCandidate'))
    if(CurrentCandidate){
      setCurrentCandidate(CurrentCandidate)
    }
    else{
      window.location.replace('/')
    }
  },[])

  async function SendUrl(){
    const response = await fetch('https://divergehr-backend.onrender.com/ExtractURL', {
        method:'POST',
        body:JSON.stringify({url:'https://www.transparenthands.org/patients-list/'}),
        headers: {
          'Content-Type': 'application/json',
      },
      });

      const sol = await response.json()
      console.log(sol.content)
      setURLData(sol.content)
  }

  

  useEffect(()=>{
    //SendUrl()
  },[])
  
  useEffect(()=>{
    if(UrlData!=''){
      setUrlArr(obj=>[...obj,{role:'user',content:`Use this knowlegde: ${JSON.stringify(UrlData)} \n
      The html provided is the web page of an NGO website. Extract all the specific programmes listed in the data. Also with each programme, display the description, money raised for the programme, money remaining for the programme, link. EXAMPLE:
      [Programme 1],[Programme 2],[Programme 3] and so on`}])
    }
  },[UrlData])

  useEffect(()=>{
    if(UrlArr.length==1){
      ResponseFromGpt()
    }
  },[UrlArr])

  async function ResponseFromGpt(){
    const res=await fetch('https://divergehr-backend.onrender.com/chat',{
        method:'POST',
        body:JSON.stringify({gptarr:UrlArr}),
        headers: {
            'Content-Type': 'application/json',
        },
      })

      const sol = await res.json()
      console.log(sol.text)
      setUrlArr(obj=>[...obj,sol.text])
  }
  


  return (
    <div className='w-full h-screen flex justify-end pt-[18vh] font-font1 text-[#565656] '>
      <div className='w-[80vw] h-full  pb-[4vh] pr-[5vw]'>
        <div className='w-full h-full bg-[#F4F4F4] rounded-xl px-[6vh] py-[8vh]'>
          {
            Loading==true?
              <div class='w-full h-full bg-gray-50 rounded-xl flex justify-center items-center'>
                  <AiOutlineLoading size='4rem' color='#000000' class='animate-spin'/>
              </div>
            :
            <div className='w-full h-full flex flex-col items-center bg-[#ffffff] rounded-xl px-[4vh] py-[2vh] space-y-[2vh]'>
            <div className="file-upload">
              <img src={uploadImg} alt="upload" className='w-[2vw] h-fit' />
              <h3>Upload your file</h3>
              <p>Limit 200MB per file • CSV, DOC, DOCX, ENEX, EML, EPUB, HTML, MD, ODT, PDF, PPT, PPTX, TXT, PNG, JPG, JPEG, HTM</p>
              <input type="file" accept=".pdf" onChange={(e) => { setFileType(obj=>[...obj,e.target.files[0]]); }}  />
            </div>
            <div className='w-full flex flex-col h-full border-[2px] rounded-xl justify-between'>
              <div class='flex flex-col'>
                <div className='w-full h-fit py-[1vh] px-[3vh] border-b-[2px]'>Uploading and Storing Files</div>
                <div className='w-full h-fit flex flex-col space-y-[2vh] py-[4vh] px-[3vh]'>
                  {
                      FileType != '' ?
                        FileType.map(obj=>
                          <div class='w-full h-fit flex justify-between'>
                            <div className='flex items-center space-x-[1vw]'>
                              <img src={pdflogo} className='w-[2vw] h-fit' />
                              <div className='flex flex-col space-y-[0.5vh]'>
                                <text className='font-bold'>{obj.name}</text>
                                <text className='text-sm'>{formatFileSize(obj.size)}</text>
                              </div>
                            </div>
                          </div>
                        )
                        :
                        <></>
                  }
                </div>
              </div>
              <div class='w-full h-fit flex justify-end py-[2vh] px-[3vh]'>
                {
                  FileType.length==2?
                  <button onClick={ResumeSubmission} className='w-fit px-[2vw] py-[1vh] rounded-xl bg-black text-white'>Submit</button>
                  :
                  <></>
                }
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AddResume;
