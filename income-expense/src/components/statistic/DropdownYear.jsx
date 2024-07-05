import PropTypes from 'prop-types';

function DropdownYear({handleYear,id}) {
  let date = new Date()
  let year = date.getFullYear()
  let years = []
  for(let i = 0; i < 25; i++){
    years.push(year)
    year--
  }
  return (
    <>
        <select id={id} onChange={handleYear} className="select select-bordered w-full max-w-md min-w-48">
          <option name="year" selected hidden value="0">Year</option>
          {
            years.map((y, index) => (
                <option value={y} key={index}>{y}</option>
              ))
          }
        </select>
    </>
  )
}

DropdownYear.propTypes = {
  handleYear: PropTypes.func,
  id: PropTypes.string
};

export default DropdownYear