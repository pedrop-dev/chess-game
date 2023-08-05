import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { API_BASE_URL } from "../../constants"

const ConfirmRegistration = () => {
  const params = new URLSearchParams(useLocation().search)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/finalize`,
      {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + params.get('token')
        }
      }
    );
  }, [])

  return (
    <div>
      <h1>Registration Successful</h1>
      <p>Login To Continue</p>
    </div>
  )
}

export default ConfirmRegistration;
