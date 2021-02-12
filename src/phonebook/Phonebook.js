import { Component } from 'react';
import Section from '../phonebook/Section/Section'
import Input from './Input/Input'
import ContactsList from './ContactsList/ContactsList'
import Filter from './Filter/Filter'
import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';
import styles from './phonebook.module.css';
import { CSSTransition } from 'react-transition-group';
import ErrorMessage from './messages/errorMessage';

export default class Phonebook extends Component {
    state = {
      contacts: [                  
        ],
      filter: '',
        name: '',
      number: '',
      error: false,
    };
   componentDidUpdate(prevProps, prevState) {
     if (prevState.contacts !== this.state.contacts) {
       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      
    }
  }
  componentDidMount() {    
    const localItems = localStorage.getItem('contacts');      
      const parcedLocalItems = JSON.parse(localItems);
      if (parcedLocalItems) {
      this.setState({ contacts: parcedLocalItems });
    }
    
  }
  onInputChange = evt => {    
    this.setState({ [evt.target.name]: evt.target.value });
    };    

  submitForm = evt => {
    evt.preventDefault();    
     this.setState({name: '', number: ''})
    if (this.state.contacts.find(({ name }) => name.toLowerCase() === this.state.name.toLowerCase())) {      
      this.setState({ error: true });
      setTimeout(() => {
        this.setState({error: false})
      }, 2000)
      return;
    } else {
      swal("Good job!", "You added contact!", "success");
    }
    const contacts = [
      ...this.state.contacts,
      { name: this.state.name, number: this.state.number, id: uuidv4()},
    ];
    this.setState({ contacts });
    };
    
  deleteContact = id => {      
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });     
    swal("Wow!", "You have delete a contact!", "success");
    } 

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleTasks = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };
  
  render() {  
    const { filter, error } = this.state;

    const visibleTasks = this.getVisibleTasks();
    return (<>
        <Section title='Phonebook'>
            <Input name={this.state.name}
          number={this.state.number}          
          onChangeInput={this.onInputChange}
          onSubmitForm={this.submitForm}/>    
      </Section>      
      <Section title='Contacts'> 
        <CSSTransition in={visibleTasks.length > 0} timeout={250} classNames={styles} unmountOnExit>
          <Filter value={filter} onfindContact={this.changeFilter}/>
        </CSSTransition>
         <CSSTransition in={visibleTasks.length > 0} timeout={250} classNames={styles} unmountOnExit>
          <ContactsList contacts={visibleTasks} onContactDelete={this.deleteContact} />
        </CSSTransition>
        <CSSTransition in={visibleTasks.length <= 0} timeout={250} classNames={styles} unmountOnExit>
          <h2 className={styles.contactsTitle}>Add contacts please</h2>
        </CSSTransition>
        <CSSTransition in={error === true} timeout={700} classNames={styles} unmountOnExit>
          <ErrorMessage/>
        </CSSTransition> 
        </Section>        
      </>
    )    
  }
}