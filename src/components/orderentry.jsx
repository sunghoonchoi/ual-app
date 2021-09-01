/*
  Order Entry React Demo for EOSIO Training & Certification: AD101
  
  Several blocks have been commented out, as they will only
  function as intended when the UAL (Universal Authenticator Library)
  wrapper is implemented in App.js – at which point props will
  contain the ual object. Uncomment (or replace) these lines as
  appropriate.
*/

import { JsonRpc } from 'eosjs'
import * as React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './orderentry.css';

const defaultState = {
  activeUser: null, //to store user object from UAL
  accountName: '', //to store account name of logged in wallet user
  orderItems: '0'
}

class OrderEntryApp extends React.Component {
  static displayName = 'OrderEntryApp'

  constructor(props) {
    super(props)
    this.state = {
      ...defaultState,
    }
    /*
    this.updateAccountName = this.updateAccountName.bind(this)
    */
    this.renderOrderButton = this.renderOrderButton.bind(this)
    this.placeorder = this.placeorder.bind(this)
    this.renderModalButton = this.renderModalButton.bind(this)
    this.handleOrderUpdate = this.handleOrderUpdate.bind(this)
    this.renderOrderForm = this.renderOrderForm.bind(this)
  }

  // implement code to transact, using the order details, here
  async placeorder() {
    const { accountName, activeUser, orderItems } = this.state
    console.log("With UAL implemented, this submits an order for items " + orderItems);
  }


  renderOrderButton() {
    return (
      <p className='ual-btn-wrapper'>
        <Button variant="outline-warning" onClick={this.placeorder}>
          {'Place Order'}
        </Button>
      </p>
    )
  }


  // once the UAL wrapper is implemented, the code below will function
  /*
  
  componentDidUpdate() {
    const { ual: { activeUser } } = this.props
    if (activeUser && !this.state.activeUser) {
      this.setState({ activeUser }, this.updateAccountName)
    } else if (!activeUser && this.state.activeUser) {
      this.setState(defaultState)
    }
  }
  
  async updateAccountName()   {
    try {
      const accountName = await this.state.activeUser.getAccountName()
      this.setState({ accountName }, this.updateAccountBalance)
    } catch (e) {
      console.warn(e)
    }
  }

  renderLogoutBtn = () => {
    const { ual: { activeUser, activeAuthenticator, logout } } = this.props
    if (!!activeUser && !!activeAuthenticator) {
      return (
        <p className='ual-btn-wrapper'>
          <Button variant='outline-danger' onClick={logout}>
            {'Logout'}
          </Button>
        </p>
      )
    }
  }

  */

  renderModalButton() {
    return (
      <p className='ual-btn-wrapper'>
        <Button variant='outline-primary'
          /* Uncomment once UAL wrapper is implemented 
          onClick={this.props.ual.showModal}
          */
          className='ual-generic-button'>Connect to Wallet</Button>
      </p>
    )
  }


  handleOrderUpdate = (event) => {
    this.setState({orderItems: event.target.value});
  }

  renderOrderForm = () => {
    const { orderItems } = this.state
    return(
      <div style={{marginLeft: 'auto', marginRight:'auto', width:'25%', marginTop:'40px', marginBottom:'10px'}}>
        <Form>
          <Form.Group controlId="orderItems">
            <Form.Label>Items to order (comma separated):</Form.Label>
            <Form.Control
                  type="text"
                  name="orderItems"
                  value={orderItems}
                  onChange={this.handleOrderUpdate}
                />
          </Form.Group>
        </Form>
      </div>
    )
  }

  render() {
    let modalButton = this.renderModalButton()
    let loggedIn = ''
    let logoutBtn = null
    const orderBtn = this.renderOrderButton()

    // Once UAL wrapper is implemented, uncomment below lines
    /*
    const { ual: { activeUser } } = this.props
    const { accountName } = this.state
    modalButton = !activeUser && this.renderModalButton()
    logoutButton = this.renderLogoutButton()
    loggedIn = accountName ? `Logged in as ${accountName}` : ''
    */

    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h2>Order Entry React Demo</h2>
        <span>EOSIO Training & Certification, AD101</span>
        <div style={{marginBottom: '20px'}}></div>
        {modalButton}
        <h3 className='ual-subtitle'>{loggedIn}</h3>
        {this.renderOrderForm()}
        {orderBtn}
        {logoutBtn}
      </div>
    )
  }
}

export default OrderEntryApp;