import { appointmentCancel } from "../../services/delete-appointments"

const periods = document.querySelectorAll(".period")

periods.forEach((period) => {
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("scheduled-remove")) {

      const item = event.target.closest("li")

      const { id } = item.dataset

      if (id) {
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        )

        if (isConfirm) {
          try {
            await appointmentCancel({ id })

            item.remove()

            alert("Agendamento cancelado com sucesso.")
          } catch (error) {
            console.error(error)
            alert("Não foi possível cancelar o agendamento.")
          }
        }
      }
    }
  })
})