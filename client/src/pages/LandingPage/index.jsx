import Button from "../../components/Button"
import { NavLink } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      <h1>Welcome Driver APP</h1>
      <h3>In this app you can watch information about drivers from F1 and create news. Enjoy it!</h3>
      <NavLink to={'/home'}>
        <Button name={"Buenas"} />
      </NavLink>
    </div>
  )
}

export default LandingPage