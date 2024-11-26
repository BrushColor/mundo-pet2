import dayjs from "dayjs"


export function filterAppointments(appointments, selectedDate = null) {
  const today = dayjs().format("YYYY-MM-DD") 
  const filterDate = selectedDate
    ? dayjs(selectedDate, "YYYY-MM-DD").isValid()
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : today 
    : today

  
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = dayjs(appointment.date, "YYYY-MM-DD", true) 

    return (
      appointmentDate.isValid() &&
      appointmentDate.format("YYYY-MM-DD") === filterDate
    ) 
  })

  return filteredAppointments
}
