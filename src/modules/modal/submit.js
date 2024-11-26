import dayjs from "dayjs"
import { newAppointments } from "../../services/new-appointments.js"
import { loadAppointments } from "../appointments/load.js"

const form = document.querySelector("form")
const tutorNameInput = document.getElementById("field-tutor")
const petNameInput = document.getElementById("field-pet")
const phoneInput = document.getElementById("field-phone")
const serviceDescriptionInput = document.getElementById(
  "field-service-description"
)
const dateInput = document.getElementById("field-date")
const timeInput = document.getElementById("field-time")

const now = dayjs(new Date())
const today = now.format("DD-MM-YYYY")
const time = now.format("HH:mm")

dateInput.value = today
dateInput.min = today

timeInput.value = time

function validateDate() {
  const selectedDate = dayjs(dateInput.value, "DD-MM-YYYY") 
  const currentYear = dayjs().year()

  if (selectedDate.year() < currentYear) {
    alert("Ano inválido. Por favor, insira um ano válido.")
    return false
  }

  return true
}

form.onsubmit = async (event) => {
  event.preventDefault() 

  try {
    if (!validateDate()) return 

    const tutorName = tutorNameInput.value.trim()
    if (!tutorName) return alert("Informe o nome do tutor!")

    const petName = petNameInput.value.trim()
    if (!petName) return alert("Informe o nome do animal!")

    const phone = phoneInput.value.trim()
    if (!phone) {
      return alert("Informe um número de telefone!")
    }

    const serviceDescription = serviceDescriptionInput.value.trim()
    if (!serviceDescription)
      return alert("Informe a descrição do serviço que será prestado!")

    const id = `${new Date().getTime()}` 

    await newAppointments({
      id,
      tutor_name: tutorName,
      pet_name: petName,
      phone,
      service_description: serviceDescription,
      date: dateInput.value,
      time: timeInput.value,
    })

    await loadAppointments(dateInput.value)

    closeModal()
    clearInputs()
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}

function clearInputs() {
  tutorNameInput.value = ""
  petNameInput.value = ""
  phoneInput.value = ""
  serviceDescriptionInput.value = ""
}
