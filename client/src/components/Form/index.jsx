import { useState } from "react";

function Form() {

    const [driver, setDriver] = useState({
        forename,
        surname,
        description,
        image,
        nacionality,
        birth
    })

    return (
        <form>
            <div>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' />
            </div>
            <div>
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' name='lastName'/>
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <input type='text' name='description' />
            </div>
            <div>
                <label htmlFor='url'>URL image</label>
                <input type='text' name='url' />
            </div>
            <div>
                <label htmlFor='nationality'>Nationality</label>
                <input type='text' name='nationality' />
            </div>
            <div>
                <label htmlFor='birth'>Birth</label>
                <input type='text' name='birth' />
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form