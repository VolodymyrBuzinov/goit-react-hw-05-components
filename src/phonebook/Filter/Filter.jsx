import PropTypes from 'prop-types';
import style from './Filter.module.css'

export default function Filter({value, onfindContact}) {
    return (
        <div className={style.div}>             
            <label htmlFor="input-search">Search Contact</label>            
            <input id="input-search" name='filter' value={value} type="text" onChange={e => onfindContact(e.target.value)}/>
            </div>
    )
} 
    

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onfindContact: PropTypes.func,
};
