import dayjs from "dayjs"
import { apiConfig } from "../../services/api-config.js"
import { filterAppointments } from "../../services/filter-appointments.js"

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export async function showAppointments(selectedDate = null) {
  const today = dayjs().format("YYYY-MM-DD")

  const filterDate = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : today

  try {
    const response = await fetch(`${apiConfig.baseURL}/appointments`)
    if (!response.ok) {
      throw new Error("Erro ao carregar os agendamentos.")
    }

    const appointments = await response.json()

    const filteredAppointments = filterAppointments(appointments, filterDate)
    console.log("Agendamentos para a data:", filteredAppointments)

    const periodMorning = document.getElementById("period-morning")
    const periodAfternoon = document.getElementById("period-afternoon")
    const periodNight = document.getElementById("period-night")

    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    filteredAppointments.forEach((appointment) => {
      const item = document.createElement("li")
      item.classList.add("appointment")
      item.setAttribute("data-id", appointment.id)

      const header = document.createElement("div")
      header.classList.add("appointment-header")
      
      const time = document.createElement("time")
      time.setAttribute("datetime", appointment.time)
      time.textContent = appointment.time
      header.appendChild(time)

      const animalTutor = document.createElement("div")
      animalTutor.classList.add("animal-tutor")

      const petName = document.createElement("strong")
      petName.textContent = appointment.pet_name

      const tutorName = document.createElement("span")
      tutorName.classList.add("tutor")
      tutorName.textContent = `/ ${appointment.tutor_name}`

      animalTutor.appendChild(petName)
      animalTutor.appendChild(tutorName)
      header.appendChild(animalTutor)


      const service = document.createElement("p")
      service.classList.add("service")
      service.textContent = appointment.service_description

      const removeButton = document.createElement("button")
      removeButton.classList.add("scheduled-remove")
      removeButton.setAttribute(
        "aria-label",
        `Remover agendamento para ${appointment.pet_name}`
      )
      removeButton.textContent = "Remover agendamento"


      item.appendChild(header)
      item.appendChild(service)
      item.appendChild(removeButton)


      const hour = dayjs(`${appointment.date} ${appointment.time}`).hour()
      if (hour <= 12) {
        periodMorning.appendChild(item)
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }

      removeButton.addEventListener("click", async () => {
        const isConfirm = confirm(
          `Deseja realmente remover o agendamento para ${appointment.pet_name}?`
        )
        if (isConfirm) {
          const id = appointment.id
          try {
            const response = await fetch(
              `${apiConfig.baseURL}/appointments/${id}`,
              { method: "DELETE" }
            )
            if (!response.ok) {
              throw new Error("Erro ao cancelar o agendamento")
            }
            alert("Agendamento cancelado com sucesso.")

            await showAppointments(filterDate)
          } catch (error) {
            console.error(error)
            alert("Não foi possível cancelar o agendamento.")
          }
        }
      })
    })
  } catch (error) {
    console.error(error)
    alert("Erro ao carregar os agendamentos.")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dateField = document.getElementById("field-calendar")
  const today = new Date()
  dateField.value = formatDate(today)

  showAppointments(today.toISOString().split("T")[0])

  dateField.addEventListener("change", (event) => {
    showAppointments(event.target.value)
  })
})
