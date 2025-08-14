import "./Button.css"

const Button = ({type, onClick, children}) => {
    return(
        <button type="button" onClick={onClick} className={`Button Button_${type}`}>
            {children}
        </button>
    )
}

export default Button;
