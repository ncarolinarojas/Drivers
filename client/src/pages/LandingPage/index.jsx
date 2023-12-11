import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { NavLink } from 'react-router-dom';
import '../LandingPage/landingPage.css';


function LandingPage() {
  return (
    <Layout>
    <div className='containerLanding'>
      <div className='container-words'>
      <h1>Welcome Driver APP</h1>
      <h3>In this app you can watch information about drivers from F1 and create news. Enjoy it!</h3>
      </div>
      <NavLink to={'/home'}>
        <Button name={"Buenas"} />
      </NavLink>
    </div>
    </Layout>
  )
}

export default LandingPage