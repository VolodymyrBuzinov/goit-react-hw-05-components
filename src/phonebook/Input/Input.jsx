import PropTypes from 'prop-types';
import style from './Input.module.css'

export default function Input({ name = '', number = 0, onChangeInput, onSubmitForm, }) {      
    return (<>
        <form className={style.form} onSubmit={onSubmitForm}>
      <label htmlFor='input-one'>Input Name</label>
        <input
          className={style.input}
          name="name"         
        type="text"
        onChange={onChangeInput}
        value={name}
        id='input-one'
      />
      <label htmlFor='input-two'>Input Number</label>
        <input
          className={style.input}
        name="number"
          type="text"          
        onChange={onChangeInput}
        value={number}
        id='input-two'
        />          
      <button className={style.but} type='submit'>Add contact</button>
        </form>
    </>)   
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func,
  onSubmitForm: PropTypes.func,
}