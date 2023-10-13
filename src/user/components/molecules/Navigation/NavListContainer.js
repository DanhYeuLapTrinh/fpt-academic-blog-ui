import React, { Component } from 'react'
import { navList } from '../../../data/NavList'
import NavList from './NavList'

export default class NavListContainer extends Component {
  constructor() {
    super()
    this.state = {
      options: navList
    }
  }
  render() {
    return (
      <NavList options={this.state.options}/>
    )
  }
}
