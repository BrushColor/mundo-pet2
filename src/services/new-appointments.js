import { apiConfig } from "./api-config.js"

export async function newAppointments({
  id,
  tutor_name,
  pet_name,
  service_description,
  date,
  time,
}) {
  try {
    await fetch(`${apiConfig.baseURL}/appointments`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        id, 
        tutor_name, 
        pet_name, 
        service_description, 
        date,
        time 
      }),
    })
  } catch (error) {
    console.log(error) 
    alert("Não foi possível agendar neste momento, tente novamente mais tarde.") 
  }
}