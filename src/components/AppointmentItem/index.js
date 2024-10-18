import './index.css'

const AppointmentItem = props => {
  const {appointmnetDetails, onChangeStar} = props
  const {title, date, isStarred, id} = appointmnetDetails

  const image = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onChangeStar(id)
  }
  return (
    <li className="appointmentItem">
      <div className="titleImageContainer">
        <p className="appointmentTitle">{title}</p>
        <button className="starBtn" onClick={onClickStar} data-testid ="star">
          <img src={image} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
