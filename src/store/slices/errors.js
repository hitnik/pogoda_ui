import { createSlice } from '@reduxjs/toolkit';

const errors = createSlice({
    name: 'errors',
    initialState:{
        fieldRequired :  'Заполните это поле',
        emailFormat : 'Неправильный формат адреса'
    }
})

export default errors.reducer;