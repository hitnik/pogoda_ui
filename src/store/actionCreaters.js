import { createAction } from '@reduxjs/toolkit';

const subscribe = createAction('SUBSCRIBE');
const unsubscribe = createAction('UNSUBSCRIBE');

const setSubFormEmail = createAction('SET_SUBFORM_EMAIL');
const setSubFormTitle = createAction('SET_SUBFORM_TITLE');

export {
        subscribe, unsubscribe, 
        setSubFormEmail, setSubFormTitle
       };