document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".schedule-service")
  const openButton = document.getElementById("scheduled-button")
  const closeButton = document.getElementById("close-modal")
  const body = document.body
  const app = document.getElementById("app")
  const dateField = document.getElementById("field-date")
  const timeField = document.getElementById("field-time")

  function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") 
    const day = String(date.getDate()).padStart(2, "0") 
    return `${year}-${month}-${day}`
  }

  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  const currentDate = new Date()

  dateField.value = formatDate(currentDate)
  timeField.value = formatTime(currentDate)

  app.classList.remove("blur")

  function openModal() {
    modal.classList.remove("hidden")
    body.classList.add("modal-open")
    app.classList.add("blur")
    openButton.classList.add("hidden")
  }

  window.closeModal = function () {
    modal.classList.add("hidden")
    body.classList.remove("modal-open")
    app.classList.remove("blur")
    openButton.classList.remove("hidden")
  }


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal()
    }
  })

  openButton.addEventListener("click", openModal)
  closeButton.addEventListener("click", closeModal)
})
