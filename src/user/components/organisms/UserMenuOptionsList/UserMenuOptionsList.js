import { Divider, Menu } from '@mui/material'
import React from 'react'
import UserMenuOption from '../../molecules/UserMenuOption/UserMenuOption'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function UserMenuOptionsList(props) {
  return (
    <Menu
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        onClick={props.handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* sửa cái này ghi tay ko in ra từ list */}
        {props.filteredOption?.map((item) => (
          <Link to={item.path} style={{textDecoration: 'none'}}>
            <UserMenuOption
              key={item.label}
              icon={item.icon}
              handleClose={props.handleClose}
              label={item.label}
            />
          </Link>
        ))}
        <Divider orientation="horizontal" />
        <UserMenuOption
          icon={
            <Icon
              icon="mdi:logout-variant"
              color="red"
              width="22"
              height="22"
              rotate={2}
            />
          }
          handleLogout={props.handleLogout}
          label="Đăng xuất"
          color="red"
        />
      </Menu>
  )
}
