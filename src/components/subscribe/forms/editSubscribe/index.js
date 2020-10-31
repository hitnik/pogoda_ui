import React, {useState} from "react";
import {Form} from 'semantic-ui-react';
import {FormInput} from '../subscribe'

const FormEditSubscribe = () =>{

    const [value, setValue] = useState('');
    const [error, setError] = useState();



    // const handleChange = (event) =>{
    //     console.log(event.target.value);
    //     setEmail(email+1);
    //     console.log(email);
    //     setError();
    // }

    const handleInputChange = (event) =>{
          setValue('dfgdfgdfg');
          console.log(value);
    }    

    return (
        <Form>
             <Form.Group widths='equal'>
                 <FormInput required
                            name = "email"
                            label = 'Адрес электронной почты'
                            placeholder = 'Адрес электронной почты'
                            data = {{value:'', error:error}}
                            onChange={handleInputChange}
                 />
             </Form.Group>
        </Form>
    )
}

export default FormEditSubscribe;