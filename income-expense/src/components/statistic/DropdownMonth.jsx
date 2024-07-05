import PropTypes from 'prop-types';

function DropdownMonth({handleMonth, id, start}) {
  let monthStart = parseInt(start)-1
    const months = [
      {
        id:"01",
        month: "January", 
      },{
        id:"02",
        month: "February", 
      },{
        id:"03",
        month: "March", 
      },{
        id:"04",
        month: "April", 
      },{
        id:"05",
        month: "May", 
      },{
        id:"06",
        month: "June",
      },{
        id:"07",
        month: "July", 
      },{
        id:"08",
        month: "August", 
      },{
        id:"09",
        month: "September", 
      },{
        id:"10",
        month: "October", 
      },{
        id:"11",
        month: "November", 
      },{
        id:"12",
        month: "December"
      } 
    ]
  const monthSlice = months.slice(monthStart)
    return (
      <>
          <select id={id} onChange={handleMonth} className="select select-bordered w-full max-w-md min-w-48">
            <option name="month" selected hidden value="0">Month</option>
            {
              monthSlice.map((m, index) => (
                  <option value={m.id} key={index}>{m.month}</option>
                ))
            }
          </select>
      </>
    )
  }
  
DropdownMonth.propTypes = {
  handleMonth: PropTypes.func,
  id: PropTypes.string,
  start: PropTypes.string
};
  export default DropdownMonth