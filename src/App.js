import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
      // {
      //   "id": "ryan",
      //   "name": "Ryan Florence",
      //   "email": "ryan@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/ryan.jpg"
      // },
      // {
      //   "id": "michael",
      //   "name": "Michael Jackson",
      //   "email": "michael@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/michael.jpg"
      // },
      // {
      //   "id": "tyler",
      //   "name": "Tyler McGinnis",
      //   "email": "tyler@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/tyler.jpg"
      // }

  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  // this only removes from the local state
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    // this makes an api request to remove from the database
    ContactsAPI.remove(contact)
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }
  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
            />
          )}/>
      </div>
    )
  }
}


export default App;
