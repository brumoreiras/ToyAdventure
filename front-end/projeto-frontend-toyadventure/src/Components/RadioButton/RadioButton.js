import './RadioButton.css'

export default function RadioButton({ name, value, nameValue, checked, onChange }) {

    return (
        <div className="container__radio">
            <label>
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}

                />
                <p>
                    {nameValue}
                </p>
            </label>
        </div>
    )
}