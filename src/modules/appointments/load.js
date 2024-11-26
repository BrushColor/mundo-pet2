import { getAppointments } from "../../services/get-appointments" 
import { showAppointments } from "../../modules/appointments/show" 

const agendaCalendarInput = document.getElementById("agenda-calendar") 

export async function loadAppointments(date) {
  agendaCalendarInput.value = date 

  const filteredAppointments = await getAppointments(date) 
  showAppointments(filteredAppointments) 
}
