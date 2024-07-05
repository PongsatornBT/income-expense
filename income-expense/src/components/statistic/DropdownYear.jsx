import PropTypes from 'prop-types';

function DropdownYear({handleYear}) {
  let date = new Date()
  let year = date.getFullYear()
  let years = []
  for(let i = 0; i < 25; i++){
    years.push(year)
    year--
  }
  return (
    <div>
        <label>Year</label><br />
        <select onChange={handleYear} className="select select-bordered w-full max-w-md min-w-48">
          <option name="year" selected hidden value="0">Year</option>
          {
            years.map((y, index) => (
                <option value={y} key={index}>{y}</option>
              ))
          }
        </select>
    </div>
  )
}

DropdownYear.propTypes = {
  handleYear: PropTypes.func
};

export default DropdownYear