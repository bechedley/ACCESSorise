import React, { useState } from 'react';
import { Icon, Menu, Input, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function Nav() {

    return (
      <Menu color="teal" inverted borderless>
        <Menu.Item color='blue' as='h2'header>ACCESSorise</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Icon name='search' size='large' color='blue' />
          </Menu.Item>
          <Menu.Item>
            <Icon name='calendar' size='large' color='blue' />
          </Menu.Item>
          <Menu.Item>
            <Icon name='heart' size='large' color='blue' />
          </Menu.Item>
          <Menu.Item>
            <Icon name='user circle' color='blue' size='large' />
          </Menu.Item>
          <Menu.Item
            name='logout' color='blue'
          />
        </Menu.Menu>
      </Menu>
    )
  }

export default Nav;
