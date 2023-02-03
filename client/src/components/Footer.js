import React, { useState } from 'react';
import { Icon, Menu, Input, Grid, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function Footer() {

    return (
        <Grid  attached='bottom' divided='vertically'>
            <Grid.Row color='grey'>
          <Grid.Column floated='left' width={5}>
            <Menu color='grey' vertical borderless inverted>
                <Menu.Item name='Our Policies'>
                </Menu.Item>
                <Menu.Item name='Get in Touch'>
                </Menu.Item>
                <Menu.Item name='How it Works'>
                </Menu.Item>
            </Menu>
            </Grid.Column>
          <Grid.Column floated='right' width={5} textAlign='right'>
                <Icon name='share alternate' size='large' />
                <Icon name='instagram alternate' size='large' />
          </Grid.Column>
          </Grid.Row>
      </Grid>
    )
  }

export default Footer;
