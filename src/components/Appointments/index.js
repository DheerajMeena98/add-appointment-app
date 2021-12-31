import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    unfilteredList: [],
    title: '',
    date: '',
    starredButtonStatus: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onAddDate = event => {
    console.log(event.target.value)
    const dateInString = format(
      new Date(event.target.value),
      'dd MMMM yyyy, EEEE',
    )
    this.setState({date: dateInString})
  }

  onAddTitle = event => {
    this.setState({title: event.target.value})
  }

  changeStarredImage = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  onClickStarredButton = () => {
    const {appointmentList, starredButtonStatus} = this.state

    if (starredButtonStatus === true) {
      this.setState(prevState => ({
        appointmentList: prevState.unfilteredList,
        starredButtonStatus: false,
      }))
    } else {
      const isAllAppointmentsStarred = appointmentList.every(
        eachApp => eachApp.isStarred === false,
      )

      if (isAllAppointmentsStarred === false) {
        this.setState(prevState => ({
          unfilteredList: prevState.appointmentList,
          appointmentList: prevState.appointmentList.filter(
            eachApp => eachApp.isStarred === true,
          ),
          starredButtonStatus: true,
        }))
      }
    }
  }

  render() {
    const {appointmentList, title} = this.state

    return (
      <div className="appointments-bcg-container">
        <div className="appointments-container">
          <form
            className="add-appointments-container"
            onSubmit={this.onAddAppointment}
          >
            <div className="add-appointment-card">
              <h1 className="add-appointment-main-heading">
                {' '}
                Add Appointment{' '}
              </h1>
              <div className="add-title-container">
                <label htmlFor="title" className="title-label">
                  {' '}
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  className="input-text-title"
                  onChange={this.onAddTitle}
                />
              </div>
              <div className="add-date-container">
                <label htmlFor="date" className="date-label">
                  {' '}
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={this.onAddDate}
                  className="input-date"
                />
              </div>
              <button type="submit" className="add-appointment-button">
                {' '}
                Add{' '}
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </form>

          <hr className="horizontal-line" />
          <div className="appointments-card-container">
            <div className="appointments-heading-starred-container">
              <h1 className="appointments-container-heading"> Appointments</h1>
              <button
                type="button"
                className="starred-button"
                onClick={this.onClickStarredButton}
              >
                {' '}
                Starred
              </button>
            </div>
            <ul className="appointments-cards">
              {appointmentList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  changeStarredImage={this.changeStarredImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
