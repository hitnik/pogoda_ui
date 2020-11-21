import React, { PureComponent } from "react";
import {Menu, Image, Grid} from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';
import BtcImg from '../../images/btc.png';
import {Link} from 'react-router-dom';

const tagOptions = [
    {
      key: 'Important',
      text: 'Important',
      value: 'Important',
      label: { color: 'red', empty: true, circular: true },
    },
    {
      key: 'Announcement',
      text: 'Announcement',
      value: 'Announcement',
      label: { color: 'blue', empty: true, circular: true },
    },
    {
      key: 'Cannot Fix',
      text: 'Cannot Fix',
      value: 'Cannot Fix',
      label: { color: 'black', empty: true, circular: true },
    },
    {
      key: 'News',
      text: 'News',
      value: 'News',
      label: { color: 'purple', empty: true, circular: true },
    }
]

class Navbar extends PureComponent{

    visible = true

    render(){
        return (
            <div>
                <Grid > 
                    <Grid.Row only='computer'>
                        <Grid.Column only='computer'>
                            <Menu inverted>
                                <Menu.Item>
                                    <Image src={BtcImg} avatar/>
                                    <span> <Link className='nav-item' to={`/`}>Отзывы о Белтелеком</Link></span>
                                </Menu.Item>
                                <Menu.Item>
                                    <Image src={LogoImg} avatar/>
                                    <span> <Link className='nav-item' to={`/weather`}>Штормовые предупреждения</Link></span>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row only='mobile tablet'>
                        <Grid.Column only='mobile tablet'>
                            <Menu inverted>
                                <Menu.Menu position="left">
                                        <Menu.Item>
                                            <span> <Link className='nav-item' to={`/`}>Отзывы</Link></span>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <span> <Link className='nav-item' to={`/weather`}>Шторм</Link></span>
                                        </Menu.Item>
                                    </Menu.Menu>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
  
        );
    }
}

export default Navbar;