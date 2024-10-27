import React, { useEffect, useState } from 'react'
import {AiOutlineLoading} from 'react-icons/ai'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function ReportAndEvaluation() {

    const [FirstTime,setFirstTime]=useState(false)
    const [FirstTime2,setFirstTime2]=useState(false)
    const [ReportArr,setReportArr]=useState([])
    const [PointArr,setPointArr]=useState([])

    const [Percentage1,setPercentage1]=useState('')
    const [Percentage2,setPercentage2]=useState('')
    const [Percentage3,setPercentage3]=useState('')
    const [Percentage4,setPercentage4]=useState('')
    const [Percentage5,setPercentage5]=useState('')

    const [Loading,setLoading]=useState(true)

    const [TStrength,setTStrength]=useState([])
    const [BStrength,setBStrength]=useState([])
    const [CStrength,setCStrength]=useState([])
    const [TImp,setTImp]=useState([])
    const [BImp,setBImp]=useState([])
    const [CImp,setCImp]=useState([])

    const [CurrentCandidate,setCurrentCandidate]=useState('')

    useEffect(()=>{
        const SelectedSavedCandidate = JSON.parse(localStorage.getItem('SelectedSavedCandidate'))
        
        if(SelectedSavedCandidate){
            setPercentage1(SelectedSavedCandidate.Percentage1)
            setPercentage2(SelectedSavedCandidate.Percentage2)
            setPercentage3(SelectedSavedCandidate.Percentage3)
            setPercentage4(SelectedSavedCandidate.Percentage4)
            setPercentage5(SelectedSavedCandidate.score)
            setTStrength(SelectedSavedCandidate.TStrength)
            setBStrength(SelectedSavedCandidate.BStrength)
            setCStrength(SelectedSavedCandidate.CStrength)
            setBImp(SelectedSavedCandidate.BImp)
            setTImp(SelectedSavedCandidate.TImp)
            setCImp(SelectedSavedCandidate.CImp)
            setLoading(false)
        }
        else
        {
            if(FirstTime==false)
            {
            const items = JSON.parse(localStorage.getItem('CandidateInfo'));
            const items2 = JSON.parse(localStorage.getItem('CandidateInfo2'));
            const gptarr = JSON.parse(localStorage.getItem('GptArr'))
            

            setReportArr(obj=>[...obj,{role:'user',content:`Take a deep breath, and act as a professional hiring manager. Evaluate the following candidate based on three metrics: \n
            1- Technical Competence & Skill Set
            2- Behavioral & Cultural Fit
            3- Communication & Interpersonal Skills. \n
            Use this knowledge of conversion that happened between the hiring manager and candidate: ${JSON.stringify(gptarr)}.
            IMPORTANT: You have to compare the answers of the candidate in the conversion with the optimal answers that you will find for that specific question. You will use cosine similarity algorithm to compare the answers and find the cosine similarity value for each answer which will be a number or digit. After finding all the values, you will take an average of all the values and convert it into a percentage score out of 100% which will be a number.\n
            I want you to give the candidate a percentage score out of 100 based on the comparison.\n 
            EXAMPLE:
            Candidate Evaluation
            [Percentage value of candidate by comparing candidates answer and gpt optimal answers]
            IMPORTANT NOTE: YOU JUST HAVE TO RETURN THE VALUES OR NUMBERS IN RESPONSE TO THIS MESSAGE , FOR EXAMPLE:
            Technical Competence & Skill Set [Technical Competence & Skill Set PERCENTAGE in number %]
            Behavioral & Cultural Fit [Behavioral & Cultural Fit PERCENTAGE in number %]
            Communication & Interpersonal Skills. [Communication & Interpersonal Skills PERCENTAGE in number %]
            Overall Sentimental Analysis. [Overall Sentimental Analysis Percentage in number %]
            OVERALL AVERAGE [OVERALL AVERAGE PERCENTAGE in number %]`}])

            
            }
            setFirstTime(true)
        }
    },[])

    useEffect(()=>{

        const SelectedSavedCandidate = JSON.parse(localStorage.getItem('SelectedSavedCandidate'))
        
        if(SelectedSavedCandidate){
            // setPercentage1(SelectedSavedCandidate.Percentage1)
            // setPercentage2(SelectedSavedCandidate.Percentage2)
            // setPercentage3(SelectedSavedCandidate.Percentage3)
            // setPercentage4(SelectedSavedCandidate.Percentage4)
            // setPercentage5(SelectedSavedCandidate.score)
            // setTStrength(SelectedSavedCandidate.TStrength)
            // setBStrength(SelectedSavedCandidate.BStrength)
            // setCStrength(SelectedSavedCandidate.CStrength)
            // setBImp(SelectedSavedCandidate.BImp)
            // setTImp(SelectedSavedCandidate.TImp)
            // setCImp(SelectedSavedCandidate.CImp)
            // setLoading(false)
        }
        else
        {
            if(FirstTime2==false)
            {
            const items = JSON.parse(localStorage.getItem('CandidateInfo'));
            const items2 = JSON.parse(localStorage.getItem('CandidateInfo2'));
            const gptarr = JSON.parse(localStorage.getItem('GptArr'))
            

            setPointArr(obj=>[...obj,{role:'user',content:`Take a deep breath, and act as a professional hiring manager. Evaluate the following candidate based on three metrics: \n
            1- Technical Competence & Skill Set
            2- Behavioral & Cultural Fit
            3- Communication & Interpersonal Skills. \n
            Use this knowledge of conversion that happened between the hiring manager and candidate: ${JSON.stringify(gptarr)}.
            IMPORTANT NOTE: YOU HAVE TO RETURN THE STRENGTHS AND AREAS FOR IMPROVEMENT IN RESPONSE TO THIS MESSAGE FOR THE FOLLOWING THREE METRICES IN TEXT AND DONOT USE NUMBERS HERE, EXAMPLE:
            Technical Competence & Skill Set STRENGTHS
            1[Strength 1]
            2[Strength 2] upto
            n[Strength n] 
            Technical Competence & Skill Set IMPROVEMENT
            1[Improvement 1]
            2[Improvement 2] upto
            n[Improvement n] 
            Behavioral & Cultural Fit STRENGTHS 
            1[Strength 1]
            2[Strength 2] upto
            n[Strength n] 
            Behavioral & Cultural Fit IMPROVEMENT
            1[Improvement 1]
            2[Improvement 2] upto
            n[Improvement n] 
            Communication & Interpersonal Skills STRENGTHS 
            1[Strength 1]
            2[Strength 2] upto
            n[Strength n] 
            Communication & Interpersonal Skills IMPROVEMENT
            1[Improvement 1]
            2[Improvement 2] upto
            n[Improvement n] `}])
                
            }
            setFirstTime2(true)
        }
    },[])

    async function ResponseFromGpt(){
        const res=await fetch('https://divergehr-backend.onrender.com/chat',{
            method:'POST',
            body:JSON.stringify({gptarr:ReportArr}),
            headers: {
                'Content-Type': 'application/json',
            },
          })
  
        const sol = await res.json()
        console.log(sol.text)
        if(sol.text){
            if(sol.text.content.includes(0)||sol.text.includes(1)||sol.text.includes(2)||sol.text.includes(3)||sol.text.includes(4)||sol.text.includes(5)||sol.text.includes(6)||sol.text.includes(7)||sol.text.includes(8)||sol.text.includes(9)){
                setReportArr(obj=>[...obj,sol.text])
            }
            else
            {
                ResponseFromGpt()
            }
        }
    }

    async function ResponseFromGpt2(){
        const res=await fetch('https://divergehr-backend.onrender.com/chat',{
            method:'POST',
            body:JSON.stringify({gptarr:PointArr}),
            headers: {
                'Content-Type': 'application/json',
            },
          })
  
        const sol = await res.json()
        console.log(sol.text)
        setPointArr(obj=>[...obj,sol.text])
    }

    function getPercentages(){
        var count=1
        for(var i=0;i<ReportArr[1].content.length;i++)
        {
            if(ReportArr[1].content[i]=='%'){
                var currentPercentage=''
                for(var j=i-1;ReportArr[1].content[j]>='0'&&ReportArr[1].content[j]<='9'||ReportArr[1].content[j]=='.';j--)
                {
                    currentPercentage=currentPercentage+ReportArr[1].content[j]
                }
                currentPercentage=currentPercentage.split('').reverse().join('')
                if(count==1)
                {
                    setPercentage1(currentPercentage)
                }
                else if(count==2)
                {
                    setPercentage2(currentPercentage)
                }
                else if(count==3)
                {
                    setPercentage3(currentPercentage)
                }
                else if(count==4)
                {
                    setPercentage4(currentPercentage)
                }
                else if(count==5)
                {
                    setPercentage5(currentPercentage)
                }
                count++
            }
        }
    }

    function ExtractPoints(){
        const Strength1 = PointArr[1].content.indexOf('STRENGTHS')
        const t1=PointArr[1].content.indexOf('Technical Competence & Skill Set')
        const t2=PointArr[1].content.indexOf('Technical Competence & Skill Set',t1+1)

        var TechStrength=[]
        for(var i=Strength1;i<t2;i++)
        {
            if(PointArr[1].content[i]>='0' && PointArr[1].content[i]<='9')
            {
                var temp=PointArr[1].content[i]
                
                for(var j=i+1;j<t2;j++)
                {
                    if(PointArr[1].content[j]>='0' && PointArr[1].content[j]<='9' )
                    {
                        break
                    }
                    else
                    {
                        temp += PointArr[1].content[j]
                    }
                }
                TechStrength.push(temp)
            }
        }
        setTStrength(TechStrength)

        const Improvement1 = PointArr[1].content.indexOf('IMPROVEMENT')
        const b1=PointArr[1].content.indexOf('Behavioral & Cultural Fit')

        var techImp=[]
        for(var i=Improvement1;i<b1;i++)
        {
            if(PointArr[1].content[i]>='0' && PointArr[1].content[i]<='9')
            {
                var temp=PointArr[1].content[i]
                
                for(var j=i+1;j<b1;j++)
                {
                    if(PointArr[1].content[j]>='0' && PointArr[1].content[j]<='9' )
                    {
                        break
                    }
                    else
                    {
                        temp += PointArr[1].content[j]
                    }
                }
                techImp.push(temp)
            }
        }
        setTImp(techImp)

        const Strength2 = PointArr[1].content.indexOf('STRENGTHS',Strength1+1)
        const b2=PointArr[1].content.indexOf('Behavioral & Cultural Fit',b1+1)
        
        var BehStrength=[]
        for(var i=Strength2;i<b2;i++)
        {
            if(PointArr[1].content[i]>='0' && PointArr[1].content[i]<='9')
            {
                var temp=PointArr[1].content[i]
                
                for(var j=i+1;j<b2;j++)
                {
                    if(PointArr[1].content[j]>='0' && PointArr[1].content[j]<='9' )
                    {
                        break
                    }
                    else
                    {
                        temp += PointArr[1].content[j]
                    }
                }
                BehStrength.push(temp)
            }
        }
        setBStrength(BehStrength)

        const Improvement2 = PointArr[1].content.indexOf('IMPROVEMENT',Improvement1+1)
        const c1=PointArr[1].content.indexOf('Communication & Interpersonal Skills')

        var BehImp=[]
        for(var i=Improvement2;i<c1;i++)
        {
            if(PointArr[1].content[i]>='0' && PointArr[1].content[i]<='9')
            {
                var temp=PointArr[1].content[i]
                
                for(var j=i+1;j<c1;j++)
                {
                    if(PointArr[1].content[j]>='0' && PointArr[1].content[j]<='9' )
                    {
                        break
                    }
                    else
                    {
                        temp += PointArr[1].content[j]
                    }
                }
                BehImp.push(temp)
            }
        }
        setBImp(BehImp)

        const Strength3 = PointArr[1].content.indexOf('STRENGTHS',Strength2+1)
        const c2=PointArr[1].content.indexOf('Communication & Interpersonal Skills',c1+1)
        
        var CommStrength=[]
        for(var i=Strength3;i<c2;i++)
        {
            if(PointArr[1].content[i]>='0' && PointArr[1].content[i]<='9')
            {
                var temp=PointArr[1].content[i]
                
                for(var j=i+1;j<c2;j++)
                {
                    if(PointArr[1].content[j]>='0' && PointArr[1].content[j]<='9' )
                    {
                        break
                    }
                    else
                    {
                        temp += PointArr[1].content[j]
                    }
                }
                CommStrength.push(temp)
            }
        }
        setCStrength(CommStrength)

        const Improvement3 = PointArr[1].content.indexOf('IMPROVEMENT',Improvement2+1)

        var CommImp=[]
        for(var i=Improvement3;i<PointArr[1].content.length;i++)
        {
            if(PointArr[1].content[i]>='0' && PointArr[1].content[i]<='9')
            {
                var temp=PointArr[1].content[i]
                
                for(var j=i+1;j<PointArr[1].content.length;j++)
                {
                    if(PointArr[1].content[j]>='0' && PointArr[1].content[j]<='9' )
                    {
                        break
                    }
                    else
                    {
                        temp += PointArr[1].content[j]
                    }
                }
                CommImp.push(temp)
            }
        }
        setCImp(CommImp)
    }

    useEffect(()=>{
        if(ReportArr.length==1){
            ResponseFromGpt()
        }   
        if(ReportArr.length==2){
            getPercentages()
        }
        
    },[ReportArr])

    useEffect(()=>{
        if(PointArr.length==1){
            ResponseFromGpt2()
        }   
    },[PointArr])

    useEffect(()=>{
        if(PointArr.length==2 && ReportArr.length==2 && Percentage1!=''){
            ExtractPoints()
            setLoading(false)
        }   
    },[PointArr,ReportArr])

    useEffect(()=>{
        const temp=JSON.parse(localStorage.getItem('SelectedSavedCandidate'))
        if(Loading==false && !temp)
        {
            localStorage.setItem('Percentage5',JSON.stringify(Percentage5))
            localStorage.setItem('Percentage1',JSON.stringify(Percentage1))
            localStorage.setItem('Percentage2',JSON.stringify(Percentage2))
            localStorage.setItem('Percentage3',JSON.stringify(Percentage3))
            localStorage.setItem('Percentage4',JSON.stringify(Percentage4))
            localStorage.setItem('TStrength',JSON.stringify(TStrength))
            localStorage.setItem('BStrength',JSON.stringify(BStrength))
            localStorage.setItem('CStrength',JSON.stringify(CStrength))
            localStorage.setItem('TImp',JSON.stringify(TImp))
            localStorage.setItem('BImp',JSON.stringify(BImp))
            localStorage.setItem('CImp',JSON.stringify(CImp))
        }
    },[Loading])

    const data = {
        labels : ['0-50','51-70','71-90','91-100'],
        datasets:[{
            label:'Score',
            data:[50,20,20,10],
            circumference:180,
            rotation:270,
            cutout:'85%',
            borderRadius:10,
            backgroundColor:['#FF718B','#FCB5C3','#FFEB3A','#7FE47E'],
        }]
    }
    const data2 = {
        datasets:[{
            label:'Score',
            data:[Percentage1,100-Percentage1],
            cutout:'70%',
            borderRadius:10,
            backgroundColor:['#EEB64F','#E5E5EF'],
        },{
            label:'Score',
            data:[Percentage2,100-Percentage2],
            cutout:'70%',
            borderRadius:10,
            backgroundColor:['#2DCF2B','#E5E5EF'],
        },{
            label:'Score',
            data:[Percentage3,100-Percentage3],
            cutout:'70%',
            borderRadius:10,
            backgroundColor:['#2FB2FA','#E5E5EF'],
        }]
    }

    const option={
        plugins: {
            legend: {
              display: false, // Set this to false to hide the legend
            },
          },
    }
    const chartText1={
        id:'chartText1',
        beforeDatasetDraw(chart,args,pluginOptions){
            const { ctx, chartArea:{top,bottom,left,right,eidth,height}}=chart

            const xCenter=chart.getDatasetMeta(0).data[0].x
            const yCenter=chart.getDatasetMeta(0).data[0].y

            ctx.save()
            ctx.fillStyle='#2FB2FA'
            ctx.font='30px sans-serif'
            ctx.textAlign='center'
            ctx.fillText(Percentage4 + '%',xCenter,yCenter-10)
        }
    }

    const chartText2={
        id:'chartText1',
        beforeDatasetDraw(chart,args,pluginOptions){
            const { ctx, chartArea:{top,bottom,left,right,eidth,height}}=chart

            const xCenter=chart.getDatasetMeta(0).data[0].x
            const yCenter=chart.getDatasetMeta(0).data[0].y

            ctx.save()
            ctx.fillStyle='#2FB2FA'
            ctx.font='30px sans-serif'
            ctx.textAlign='center'
            ctx.fillText(Percentage5 + '%',xCenter,yCenter-10)
        }
    }

    useEffect(()=>{
        const SelectedSavedCandidate = JSON.parse(localStorage.getItem('SelectedSavedCandidate'))
        
        if(!SelectedSavedCandidate){
            const CurrentCandidate=JSON.parse(localStorage.getItem('CurrentCandidate'))
            const items = JSON.parse(localStorage.getItem('CandidateInfo'));
            const items2 = JSON.parse(localStorage.getItem('CandidateInfo2'));
            const gptarr=JSON.parse(localStorage.getItem('GptArr'))

            if(CurrentCandidate && items &&items2 && gptarr){
            setCurrentCandidate(CurrentCandidate)
            }
            else if(CurrentCandidate && items && items2){
                window.location.replace('/chatbot')
            }
            else if(CurrentCandidate){
                window.location.replace('/add')
            }
            else{
                window.location.replace('/')
            }
        }
      },[])

  return (
    <div className='w-full h-screen flex justify-end pt-[18vh] font-font1 text-[#565656] '>
        <div className='w-[80vw] h-full  pb-[4vh] pr-[5vw]'>
            <div class='w-full h-full flex flex-col rounded-xl px-[5vh] py-[3vh] space-y-[3vh] border-[1px] shadow-md overflow-y-scroll'>
                {
                    Loading==true?
                    <div class='w-full h-full bg-gray-50 rounded-xl flex justify-center items-center'>
                        <AiOutlineLoading size='4rem' color='#000000' class='animate-spin'/>
                    </div>
                    :
                    
                    <div class='flex flex-col space-y-[3vh]'>
                        <div class='w-full h-fit flex space-x-[1vw] '>
                            <div class='flex flex-col rounded-xl border-[1px] py-[2vh] px-[5vh]'>
                                <div class='w-full flex flex-col'>
                                    <text class='text-black/40 text-xs'>QA Report</text>
                                    <text class='text-[#479CDE] font-bold text-sm'>Sentiment Analysis</text>
                                </div>
                                <div class='w-full h-[1px] bg-black/10 mt-[2vh]'></div>
                                <div class='w-fit h-[25vh]'>
                                    <Doughnut
                                    data={data}
                                    options={option}
                                    plugins={[chartText1]}
                                    >
                                        hello
                                    </Doughnut>
                                </div>
                                <div class='w-full flex flex-col items-center space-y-[1vh]'>
                                    <text class='text-black/40 text-xs'>Overall Sentiment Analysis</text>
                                    {
                                        parseInt(Percentage4,10)>=0&&parseInt(Percentage4,10)<=50?
                                        <text class='bg-[#FF718B] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Poor</text>
                                        :
                                        [
                                            parseInt(Percentage4,10)>=51&&parseInt(Percentage4,10)<=70?
                                            <text class='bg-[#FCB5C3] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Fair</text>
                                            :
                                            [
                                                parseInt(Percentage4,10)>=71&&parseInt(Percentage4,10)<=90?
                                                <text class='bg-[#FFEB3A] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Good</text>
                                                :
                                                
                                                <text class='bg-[#7FE47E] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Excellent</text>
                                            ]
                                        ]
                                    }
                                </div>
                            </div>
                            <div class='flex flex-col rounded-xl border-[1px] py-[2vh] px-[5vh]'>
                                <div class='w-fit flex flex-col'>
                                    <text class='text-black/40 text-xs'>QA Report</text>
                                    <text class='text-[#479CDE] font-bold text-sm'>Correctness of Answers</text>
                                </div>
                                <div class='w-full h-[1px] bg-black/10 mt-[2vh]'></div>
                                <div class='w-fit h-[25vh]'>
                                    <Doughnut
                                    data={data}
                                    options={option}
                                    plugins={[chartText2]}
                                    >
                                        hello
                                    </Doughnut>
                                </div>
                                <div class='w-full flex flex-col items-center space-y-[1vh]'>
                                    <text class='text-black/40 text-xs'>Overall Evaluation</text>
                                    {
                                        parseInt(Percentage4,10)>=0&&parseInt(Percentage4,10)<=50?
                                        <text class='bg-[#FF718B] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Poor</text>
                                        :
                                        [
                                            parseInt(Percentage4,10)>=51&&parseInt(Percentage4,10)<=70?
                                            <text class='bg-[#FCB5C3] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Fair</text>
                                            :
                                            [
                                                parseInt(Percentage4,10)>=71&&parseInt(Percentage4,10)<=90?
                                                <text class='bg-[#FFEB3A] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Good</text>
                                                :
                                                
                                                <text class='bg-[#7FE47E] text-white px-[1vh] py-[0.5vh] font-bold text-sm rounded-full'>Excellent</text>
                                            ]
                                        ]
                                    }
                                </div>
                            </div>
                            <div class='w-full h-full flex rounded-xl border-[1px] items-center'>
                                <div class='w-fit h-fit flex flex-col justify-between  py-[2vh] px-[3vh] space-y-[2vh]'>
                                    <div class='w-full flex flex-col'>
                                        <text class='text-black/40 text-xs'>QA Report</text>
                                        <text class='text-[#479CDE] font-bold text-sm'>Sentiment Analysis</text>
                                    </div>
                                    <div class='w-full h-[1px] bg-black/10 mt-[2vh]'></div>
                                    <div class='w-fit h-[25vh]'>
                                        <Doughnut
                                        data={data2}
                                        options={option}
                                        >
                                        </Doughnut>
                                    </div>
                                </div>
                                <div class='flex flex-col space-y-[1vh]'>
                                    <div class='flex items-center space-x-[1vh]'>
                                        <div class='p-[0.8vh] w-fit h-fit bg-[#EEB64F] rounded-full'></div>
                                        <text class='text-xs'>Technical Competence & Skill Set</text>
                                        <text class='bg-[#7FE47E] text-white px-[1vh] py-[0.5vh] font-bold text-xs rounded-full'>{Percentage1}%</text>
                                    </div>
                                    <div class='flex items-center space-x-[1vh]'>
                                        <div class='p-[0.8vh] w-fit h-fit bg-[#2FB2FA] rounded-full'></div>
                                        <text class='text-xs'>Behavioral & Cultural Fit</text>
                                        <text class='bg-[#7FE47E] text-white px-[1vh] py-[0.5vh] font-bold text-xs rounded-full'>{Percentage2}%</text>
                                    </div>
                                    <div class='flex items-center space-x-[1vh]'>
                                        <div class='p-[0.8vh] w-fit h-fit bg-[#79FA78] rounded-full'></div>
                                        <text class='text-xs'>Communication & Interpersonal Skills</text>
                                        <text class='bg-[#7FE47E] text-white px-[1vh] py-[0.5vh] font-bold text-xs rounded-full'>{Percentage3}%</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='w-full h-fit flex rounded-xl border-[1px] py-[2vh] px-[3vh]'>
                            <div class='w-full flex flex-col space-y-[2vh]'>
                                <div class='w-full flex flex-col'>
                                    <text class='text-black/40 text-xs'>Evaluation</text>
                                    <text class='text-[#479CDE] font-bold text-sm'>Technical Competence & Skill Set</text>
                                </div>
                                <div class='w-full h-[1px] bg-black/10 mt-[2vh]'></div>
                                <div class='flex flex-col p-[1vh]'>
                                    <text class='font-bold text-sm'>Strengths:</text>
                                    {
                                        TStrength.map(obj=>
                                            <text class='text-xs ml-[1vh]'>{obj}</text>
                                        )
                                    }
                                </div>
                                <div class='flex flex-col bg-[#FFFBD9] p-[1vh] rounded-xl text-[#BF725A]'>
                                    <text class='font-bold text-sm'>Areas for Improvement:</text>
                                    {
                                        TImp.map(obj=>
                                            <text class='text-xs ml-[1vh]'>{obj}</text>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div class='w-full h-fit flex rounded-xl border-[1px] py-[2vh] px-[3vh]'>
                            <div class='w-full flex flex-col space-y-[2vh]'>
                                <div class='w-full flex flex-col'>
                                    <text class='text-black/40 text-xs'>Evaluation</text>
                                    <text class='text-[#479CDE] font-bold text-sm'>Behavioral & Cultural Fit</text>
                                </div>
                                <div class='w-full h-[1px] bg-black/10 mt-[2vh]'></div>
                                <div class='flex flex-col p-[1vh]'>
                                    <text class='font-bold text-sm'>Strengths:</text>
                                    {
                                        BStrength.map(obj=>
                                            <text class='text-xs ml-[1vh]'>{obj}</text>
                                        )
                                    }
                                </div>
                                <div class='flex flex-col bg-[#FFFBD9] p-[1vh] rounded-xl text-[#BF725A]'>
                                    <text class='font-bold text-sm'>Areas for Improvement:</text>
                                    {
                                        BImp.map(obj=>
                                            <text class='text-xs ml-[1vh]'>{obj}</text>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div class='w-full h-fit flex rounded-xl border-[1px] py-[2vh] px-[3vh]'>
                            <div class='w-full flex flex-col space-y-[2vh]'>
                                <div class='w-full flex flex-col'>
                                    <text class='text-black/40 text-xs'>Evaluation</text>
                                    <text class='text-[#479CDE] font-bold text-sm'>Communication & Interpersonal Skills</text>
                                </div>
                                <div class='w-full h-[1px] bg-black/10 mt-[2vh]'></div>
                                <div class='flex flex-col p-[1vh]'>
                                    <text class='font-bold text-sm'>Strengths:</text>
                                    {
                                        CStrength.map(obj=>
                                            <text class='text-xs ml-[1vh]'>{obj}</text>
                                        )
                                    }
                                </div>
                                <div class='flex flex-col bg-[#FFFBD9] p-[1vh] rounded-xl text-[#BF725A]'>
                                    <text class='font-bold text-sm'>Areas for Improvement:</text>
                                    {
                                        CImp.map(obj=>
                                            <text class='text-xs ml-[1vh]'>{obj}</text>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default ReportAndEvaluation




{/* <div class='w-full flex flex-col space-y-[2vh]'>
                        <div class='w-full flex flex-col'>
                            <text class='text-black/40'>QA Report</text>
                            <text class='text-[#479CDE] font-bold text-2xl'>Candidate Evaluation</text>
                        </div>
                        <div class='flex space-x-[5vw] items-center'>
                            <div class='w-[50%] h-[3vh] border-[2px] border-black/30 rounded-full '>
                                <div class={`h-full bg-[#EEB64F] rounded-full`} style={{ width: `${Percentage1}%` }}>
                                </div>
                            </div>
                            <div class='flex space-x-[1vw] items-center'>
                                <div class='p-[1.5vh] bg-[#EEB64F] rounded-full'></div>
                                <text class='font-medium'>Technical Competence & Skill Set</text>
                                <text class='bg-[#2DCF2B] p-[1vh] text-white shadow-md'>{Percentage1} %</text>
                            </div>
                        </div>
                        <div class='flex space-x-[5vw] items-center'>
                            <div class='w-[50%] h-[3vh] border-[2px] border-black/30 rounded-full '>
                                <div class={`h-full bg-[#2FB2FA] rounded-full`} style={{ width: `${Percentage2}%` }}>
                                </div>
                            </div>
                            <div class='flex space-x-[1vw] items-center'>
                                <div class='p-[1.5vh] bg-[#2FB2FA] rounded-full'></div>
                                <text class='font-medium'>Behavioral & Cultural Fit</text>
                                <text class='bg-[#2DCF2B] p-[1vh] text-white shadow-md'>{Percentage2} %</text>
                            </div>
                        </div>
                        <div class='flex space-x-[5vw] items-center'>
                            <div class='w-[50%] h-[3vh] border-[2px] border-black/30 rounded-full '>
                                <div class={`h-full bg-[#79FA78] rounded-full`} style={{ width: `${Percentage3}%` }}>
                                </div>
                            </div>
                            <div class='flex space-x-[1vw] items-center'>
                                <div class='p-[1.5vh] bg-[#79FA78] rounded-full'></div>
                                <text class='font-medium'>Communication & Interpersonal Skills</text>
                                <text class='bg-[#2DCF2B] p-[1vh] text-white shadow-md'>{Percentage3} %</text>
                            </div>
                        </div>
                        <div class='flex space-x-[5vw] items-center'>
                            <div class='w-[50%] h-[3vh] border-[2px] border-black/30 rounded-full '>
                                <div class={`h-full bg-[#000000] rounded-full`} style={{ width: `${Percentage4}%` }}>
                                </div>
                            </div>
                            <div class='flex space-x-[1vw] items-center'>
                                <div class='p-[1.5vh] bg-[#000000] rounded-full'></div>
                                <text class='font-medium'>Overall Sentimental</text>
                                <text class='bg-[#2DCF2B] p-[1vh] text-white shadow-md'>{Percentage4} %</text>
                            </div>
                        </div>
                        <div class='flex space-x-[5vw] items-center'>
                            <div class='w-[50%] h-[3vh] border-[2px] border-black/30 rounded-full '>
                                <div class={`h-full bg-[#000000] rounded-full`} style={{ width: `${Percentage5}%` }}>
                                </div>
                            </div>
                            <div class='flex space-x-[1vw] items-center'>
                                <div class='p-[1.5vh] bg-[#000000] rounded-full'></div>
                                <text class='font-medium'>Overall Score</text>
                                <text class='bg-[#2DCF2B] p-[1vh] text-white shadow-md'>{Percentage5} %</text>
                            </div>
                        </div> */}