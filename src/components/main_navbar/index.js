import React, { Component } from "react";

import {Menu, Image} from 'semantic-ui-react';

import LogoImg from '../../images/logo.png';

class Navbar extends Component{
    render(){
        return (
            <div>
                <Menu inverted>
                    <Menu.Item>
                        <Image src={LogoImg} avatar/>
                        <span>Штормовые предупреждения</span>
                    </Menu.Item>
                </Menu>
            </div>
  
        );
    }
}

export default Navbar;