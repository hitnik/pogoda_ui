import React, { PureComponent } from "react";
import { Menu, Icon, Dropdown} from 'semantic-ui-react';

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]

const DropdownMenuComponent = () =>{

    return (
        <Dropdown
            className='button icon'
            floating
            options={options}
            trigger={<></>}
        />
    )    
}

export default DropdownMenuComponent;