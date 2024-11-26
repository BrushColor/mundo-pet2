import { apiConfig } from "./api-config.js"

export async function getAppointments(date) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/appointments`)

    if (!response.ok) {
      throw new Error(`Erro ao buscar agendamentos: ${response.statusText}`)
    }

    const Appointments = await response.json()

    const AppointmentsFilteredByDate = Appointments.filter(
      (appointments) => date === appointments.date
    )

    return AppointmentsFilteredByDate
  } catch (error) {
    console.log(error)
    alert("Não foi possível buscar os agendamentos do dia selecionado.")
  }
}
