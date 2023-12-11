import '../Button/button.css';

function Button({ name }) {
  return (
    <div>
      <button className="btn">
          <span>{name}</span>
      </button>
    </div>
  )
}

export default Button