import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactList.module.css'
import { TransitionGroup , CSSTransition } from 'react-transition-group';

export default function ContactsList({ contacts, onContactDelete}) {    
    return (
        <>   
        <TransitionGroup component="ul" className={styles.list}>            
                {contacts.map(contact => {                    
                    const { id , name, number } = contact;                    
                    return (
                        <CSSTransition key={id} in={true} appear={true} timeout={250} classNames={styles} unmountOnExit>
                        <li key={uuidv4()}>                            
                            <p>Name: {name}</p>
                            <p>Number: {number}</p>
                            <button className={styles.deleteButton} type="button" onClick={() => onContactDelete(id)}>Delete contact</button>
                        </li>
                        </CSSTransition>
                    )
                    })}
             
            </TransitionGroup>
            </>
    )
}

ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }                        
     )
    ),
  onDeleteContact: PropTypes.func,
}


