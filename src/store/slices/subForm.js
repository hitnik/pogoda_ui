import { createSlice } from '@reduxjs/toolkit';

const subFormSlice = createSlice({
    name: 'subForm',
    initialState: {
        title: '',
        email: ''
    }
});