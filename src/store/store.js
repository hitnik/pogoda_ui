import  store  from '../../src'
import { setSubFormInitial } from './slices/subForm';
import {setCodeDataInitial } from './slices/codeData'

const setStoreInitial = () => {
    store.dispatch(setSubFormInitial());
    store.dispatch(setCodeDataInitial());
}


export  {setStoreInitial};