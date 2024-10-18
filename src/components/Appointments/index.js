import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    nameINput: '',
    dateInput: '',
  }
  changeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }
  changeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }
  submitForm = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const appointmentDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const appointment = {
      id: uuidv4(),
      title: nameInput,
      date: appointmentDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, appointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  onChangeStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }
  starredAppoinments = () => {
    const {appointmentsList} = this.state
    const filteredItems = appointmentsList.filter(
      each => each.isStarred === true,
    )
    this.setState({appointmentsList: filteredItems})
  }

  render() {
    const {nameInput, dateInput, appointmentsList} = this.state
    return (
      <div className="appContainer">
        <div className="formContainer">
          <h1 className="appointmentAppHeading">Add Appointment</h1>
          <div className="form-image-Container">
            <form className="title-date-Container" onSubmit={this.submitForm}>
              <label className="label" htmlFor="Title">
                TITLE
              </label>
              <input
                type="text"
                id="Title"
                placeholder="Title"
                className="input"
                value={nameInput}
                onChange={this.changeNameInput}
              />
              <label className="label" htmlFor="Date">
                DATE
              </label>
              <input
                type="date"
                id="Date"
                placeholder="dd/mm/yyyy"
                className="input"
                value={dateInput}
                onChange={this.changeDateInput}
              />
              <div className="addBtnContainer">
                <button className="addBtn" type="submit">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointmentsImg"
            />
          </div>
          <hr />
          <div className="appointmentsContainer">
            <h1 className="appointmentsContainerHeading">Appointments</h1>
            <div>
              <button className="starredBtn" onClick={this.starredAppoinments}>
                Starred
              </button>
            </div>
          </div>
          <ul className="itemsContainer">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmnetDetails={eachAppointment}
                onChangeStar={this.onChangeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
