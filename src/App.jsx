import { useState } from 'react'
import JsonMock from './components/Jsonmock'
import './App.css'
import Action from './components/action'
import AppExplain from './components/AppExplain'
import { useEffect,useRef } from 'react'
import Semesterinput from './components/Semesterinput'
import EndSemestermessage from './components/EndSemestermessage'
import NewSemMessage from './components/NewSemMessage'
import WeekInput from './components/WeekInput'
import NewWeekMessage from './components/newWeekMessage'
import EndWeekmessage from './components/EndWeekmessage'
import Persistdata from './util/Persistdata'
import SemesterOverview from './components/SemesterOverview'
import PurchasesInput from './components/PurchasesInput'
import WeekOverView from './components/WeekOverView'
import WkWrappedpopup from './components/WkWrappedpopup'
import SemesterWrappedPopup from './components/SemesterWrappedPopup'

function App() {
  //show Semester end popup
  const [showSemEnd,setShowSemEnd]=useState(false)
  const [semCreated,setSemCreated]=useState(false)
  const[weekCreated,setWeekCreated]=useState(false)
  const [showWeekEnd,setShowWeekEnd]=useState(false)

  const [showWrappedModal,setShowWrappedModal]=useState(true)
  const [showSemesterWrapped,setShowSemesterWrapped]=useState(true)
  const [Json, setJson] = useState(() => {
  const stored = localStorage.getItem("SemesterJson");
  return stored ? JSON.parse(stored) : JsonMock();
});

  

useEffect(() => {
 
  Persistdata(Json);
}, [Json]);

  
  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-100 via-white to-blue-50 text-gray-800"> 
    
      

      <Action/>
      <AppExplain/>
      <Semesterinput Json={Json} setJson={setJson} showSemEnd={showSemEnd} setShowSemEnd={setShowSemEnd}
       semcreated={semCreated} setSemCreated={setSemCreated} setShowSemesterWrapped={setShowSemesterWrapped}/>
      <WeekInput Json={Json} setJson={setJson} weekCreated={weekCreated} setWeekCreated={setWeekCreated}
      showWeekEnd={showWeekEnd} setShowWeekEnd={setShowWeekEnd}  setShowWrappedModal={setShowWrappedModal}/>
       <PurchasesInput Json={Json} setJson={setJson}/>
       <SemesterOverview Json={Json} setJson={setJson}/>
       <WeekOverView Json={Json} setJson={setJson} />
    <WkWrappedpopup Json={Json} setJson={setJson} showWrappedModal={showWrappedModal} setShowWrappedModal={setShowWrappedModal}/>
    <SemesterWrappedPopup Json={Json} showSemesterWrapped={showSemesterWrapped} setShowSemesterWrapped={setShowSemesterWrapped}/>
    <EndSemestermessage showSemEnd={showSemEnd} setShowSemEnd={setShowSemEnd}/>
    <NewSemMessage semCreated={semCreated} setSemCreated={setSemCreated}/>
    <NewWeekMessage weekCreated={weekCreated} setWeekCreated={setWeekCreated}/>
    <EndWeekmessage showWeekEnd={showWeekEnd} setShowWeekEnd={setShowWeekEnd}/>
  
    
    </div>
  )
}

export default App
