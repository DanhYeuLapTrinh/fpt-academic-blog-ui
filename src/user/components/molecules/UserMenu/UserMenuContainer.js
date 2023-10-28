import React, { Component } from 'react'
import { lecturerMenuList, mentorMenuList, studentMenuList } from '../../../data/OptionList';
import UserMenu from './UserMenu';

export default class UserMenuContainer extends Component {
  constructor() {
    super();
    this.state = {
      studentList: studentMenuList,
      mentorList: mentorMenuList,
      lecturerList: lecturerMenuList,
    };
  }
  render() {
    return (
      <UserMenu
        student={this.state.studentList}
        mentor={this.state.mentorList}
        lecturer={this.state.lecturerList}
      />
    )
  }
}
