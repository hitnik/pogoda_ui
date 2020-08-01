import React, { PureComponent } from "react";
import {Menu, Image} from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';
import { Link } from 'react-router-dom';

class Navbar extends PureComponent{
    render(){
        return (
            <div>
                <Menu inverted>
                    <Menu.Item>
                        <Image src={LogoImg} avatar/>
                        <span> <Link to={`/`}>Штормовые предупреждения</Link></span>
                    </Menu.Item>
                </Menu>
            </div>
  
        );
    }
}

export default Navbar;