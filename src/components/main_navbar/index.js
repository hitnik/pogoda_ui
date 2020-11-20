import React, { PureComponent } from "react";
import {Menu, Image, Grid, Button, Icon, Dropdown} from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';
import BtcImg from '../../images/btc.png';
import {Link} from 'react-router-dom';
import DropdownMenuComponent from './sidebar';

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
                                <Menu.Menu position="right">
                                    <Menu.Item>
                                        <Button inverted className='icon'>
                                            <Icon name="align justify"></Icon>
                                        </Button>
                                        {/* {this.visible && <DropdownMenuComponent/>} */}
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