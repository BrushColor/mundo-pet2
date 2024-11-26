import { apiConfig } from "./api-config.js"

export async function appointmentCancel({ id }) {
  try {
    await fetch(`${apiConfig.baseURL}/appointments/${id}`, {
      method: "DELETE",
    })

    alert("Agendamento cancelado com sucesso.")
  } catch (error) {
    console.log(error)
    alert("Não foi possível cancelar o agendamento.")
  }
}
