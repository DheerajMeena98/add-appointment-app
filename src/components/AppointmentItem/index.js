import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, changeStarredImage} = props
  const {title, date, isStarred, id} = eachAppointment
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickStarredImage = () => {
    console.log(id)
    changeStarredImage(id)
  }

  return (
    <li className="each-appointment-container" id={id}>
      <div className="title-favourite-container">
        <p className="each-appointment-title"> {title} </p>
        <button
          type="button"
          onClick={onClickStarredImage}
          className="each-starred-image"
          testid="star"
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="each-appointment-date"> {`Date:    ${date}`} </p>
    </li>
  )
}

export default AppointmentItem
