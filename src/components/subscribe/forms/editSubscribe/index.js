import React, {useState, useEffect} from "react";
import {Form} from 'semantic-ui-react';
import {FormInput} from '../subscribe'

const FormEditSubscribe = (props) =>{


    return (
        <Form>
             <Form.Group widths='equal'>
                 <FormInput required
                            name = "email"
                            label = 'Адрес электронной почты'
                            placeholder = 'Адрес электронной почты'
                            data = {props.data}
                            onChange = {props.onInputChange}
                 />
             </Form.Group>
        </Form>
    )
}

export default FormEditSubscribe;