import { useState } from "react"
import DropdownMonth from "./DropdownMonth"
import DropdownYear from "./DropdownYear"
import PropTypes from 'prop-types';

function FormDate({setDate}) {
  const now = new Date()
  const [yearStart, setYearStart] = useState(now.getFullYear())
  const [yearEnd, setYearEnd] = useState(now.getFullYear())
  const [monthStart, setMonthStart] = useState('1')
  const [monthEnd, setMonthEnd] = useState('12')

  function handleYear(event) {
    if(event.target.id === "start"){
      setYearStart(event.target.value);
    }else if(event.target.id === "end"){
      setYearEnd(event.target.value);
    }
  }
  
  function handleMonth(event) {
    if(event.target.id === "start"){
      setMonthStart(event.target.value)
    }else if(event.target.id === "end"){
      setMonthEnd(event.target.value)
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    const newDateStart = yearStart+'-'+monthStart
    const newDateEnd = yearEnd+'-'+monthEnd
    //use variable to update new date real time
    setDate({
      dateStart:newDateStart,
      dateEnd:newDateEnd
    })
  }
  return (
    <div>
        <h1 className="pb-2 font-bold text-3xl lg:text-6xl md:text-5xl sm:text-4xl">Statistic</h1><br />
        <form onSubmit={handleSubmit} className="grid grid-rows-3 gap-5">
          <div className="grid gap-2">
            <label className="pb-2 font-bold text-3xl">Start</label><br />
            <DropdownYear handleYear={handleYear} id="start"/>
            <DropdownMonth handleMonth={handleMonth} id="start"/>
          </div>
          <div className="grid gap-2">
            <label className="pb-2 font-bold text-3xl">End</label><br />
            <DropdownYear handleYear={handleYear} id="end"/>
            <DropdownMonth handleMonth={handleMonth} id="end" start={monthStart} />
          </div>
          <button type="submit" className="btn btn-neutral btn-md max-w-56">Submit</button>
      </form>
    </div>
  )
}

FormDate.propTypes = {
  setDate: PropTypes.func,
};
export default FormDate