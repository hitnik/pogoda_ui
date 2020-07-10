import { createAction } from '@reduxjs/toolkit';

const setSubFormEmail = createAction('SET_SUBFORM_EMAIL');
const setSubFormTitle = createAction('SET_SUBFORM_TITLE');

export {
        setSubFormEmail, setSubFormTitle
       };