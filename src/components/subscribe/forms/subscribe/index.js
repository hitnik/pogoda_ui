import React, { PureComponent, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Segment, Button, Grid, Form, 
        Header, Container, Dimmer, Loader,
        Checkbox, Message, Popup, Divider
      } from 'semantic-ui-react';
import MessageErrror from '../../../dummy/messages/messageError';
import {setSubFormEmail, setSubFormTitle,
        clearSubFormEmailError, clearSubFormTitleError,
        setSubFormTitleErrorRequired, setSubFormEmailErrorFormat,
        setSubFormEmailErrorRequired, setSubFormInitial, 
        fetchHazardLevels,setMarkedLevels
        }  from '../../../../store/slices/subForm';
import { setStoreInitial } from '../../../../store/store';
import { responseErrorsHumanize } from '../../../../actions/weatherActions/api';
import {fetchSubForm} from '../../../../store/slices/subForm';

class ButtonFormClose extends PureComponent {

  render () {
    return <Form.Button onClick={this.props.onClick} content="Закрыть" />
  }
}

class ButtonFormSubmit extends PureComponent {
   render () {
     return <Form.Button positive onClick={this.props.onClick} content="Отправить"/>
   }
}

class ButtonGroupSubmitClose extends PureComponent {

  constructor(props) {
    super(props);
    this.close= this.close.bind(this);
  }

  close = (e) => {
    e.preventDefault();
    setStoreInitial();
    this.props.history.push('/');
  }

  render () {
      const {submitAction} = this.props
      
      const buttonGroup = (
        <Grid>
          <Grid.Row >
            <Grid.Column textAlign="right">
            <Button.Group >
              <div className="padBut">
              <ButtonFormClose className="padBut" onClick={this.close}/>
              </div>
              <div className="padBut.right">
                <ButtonFormSubmit  onClick={submitAction}/>
              </div>
            </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
      return buttonGroup
  }
}

class FormInput extends PureComponent {
  constructor (props){
    super(props)
    this.onChange = props.onChange
    this.name = props.name
    this.label = props.label
    this.placeholder = props.placeholder

  }
  
  render () {
    const input = <Form.Input required name={this.name} label={this.label} placeholder={this.placeholder}
                              defaultValue = {this.props.data.value} 
                              error={this.props.data.error ? (this.props.data.msg) : undefined}
                              onChange={this.onChange}
                              />
    return input; 
  }
} 


const CheckBoxMap = (props) =>{
  

  const handleCheckBoxChange = (e)=>{
    if (e.target.checked) {
      let id = parseInt(e.target.id)+1;
      if (document.getElementById(id)){
        let elem = document.getElementById(id);
        if (!elem.checked){
          elem.click();
        }
      }
  }else{
    let id = parseInt(e.target.id)-1;
    if (document.getElementById(id)){
      let elem = document.getElementById(id);
      if (elem.checked){
        elem.click();
      }
    }
  }
}

  return (
    <Segment basic>
      <Segment basic centered="true">
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
                <Header as='h5'> Выберите уровни опасности метеоявлений, которые вы хотите получать</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {props.loadingLevels ?
      <Form.Group>
        <Form.Field>
            <Checkbox label='Неопасно'/>
        </Form.Field>
        <Form.Field>
            <Checkbox label='Немного опасно'/>
        </Form.Field>
        <Form.Field>
            <Checkbox label='Просто опасно'/>
        </Form.Field>
        <Form.Field>
            <Checkbox label='Очень опасно'/>
        </Form.Field>
        <Dimmer active inverted>
          <Loader size='large' inverted>Loading</Loader>
        </Dimmer>
      </Form.Group>
      :
        props.levelsError === null 
          ?
            props.hazardLevels.length > 0 
              ?
              <Segment basic>
              <Form.Group>
                  {props.hazardLevels.map(
                      item =>
                                <Popup key={item.id}
                                    on = {'hover'}
                                    content={item.description} 
                                    trigger ={
                                      <Form.Field>
                                        <Checkbox onChange={handleCheckBoxChange}
                                                        id={item.id} 
                                                        label={item.title}
                                                        value={item.id}
                                                        {...(props.markedLevels.indexOf(item.id) >= 0 && {defaultChecked:true} )}
                                                       
                                              />
                                      </Form.Field>
                                    } 
                                    size='tiny'
                                    wide='very'
                                /> 
                              
                  )}
              </Form.Group>   
                <Divider/>
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign="center">
                        <Header as='h6' color='grey'> Если не омечено ни одного уровня, вы будете подписаны на все.</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
          : 
          <Segment basic>
            <Message floating>Будут выбраны все уровни опасности </Message>
          </Segment>
        :
          <Segment basic>
            <Message floating>Будут выбраны все уровни опасности </Message>
          </Segment>
      }
    </Segment>          
      
      
  )
}

class SubscribeForm extends PureComponent{


  constructor(props){
    super(props)
 
    this.state = {
      isLoading: false,
      titleError: false,
    };
  }

  componentDidMount = () => {
    this.props.fetchHazardLevels();
}

  validate = () => {
    if (this.props.isSubscribe && this.props.subForm.title.value === '') {
      this.props.setTitleErrorRequired();
      return false; 
    }
    if (this.props.subForm.email.value === ''){
      this.props.setEmailErrorRequired();
      return false; 
    }
    else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.props.subForm.email.value)){
      this.props.setEmailErrorFormat();
      return false; 
    }
    return true;
  }

  handleInputChange = (event) =>{
    const name= event.target.name
    if(name == 'email'){
      this.props.setEmail(event.target.value);
      this.props.clearEmailError();
    }
    if(name == 'title'){
      this.props.setTitle(event.target.value);
      this.props.clearTitleError();
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    if (! this.validate()) {return null};

    const form = document.forms.subscribe;
    const inputs = form.querySelectorAll("input[type='checkbox']");
    const markedLevels = [];
    Array.from(inputs).map(item => item.checked && markedLevels.push(parseInt(item.value)));
    this.props.setMarkedLevels(markedLevels);
    this.props.isSubscribe ? this.props.fetchSubForm(
        {title:this.props.subForm.title.value, 
          email: this.props.subForm.email.value,
          hazardLevels: markedLevels})
    :this.props.fetchSubForm({email:this.props.subForm.email.value});
  }

  keyPress = (e) => {
    if(e.keyCode == 13){
      this.handleSubmit(e)
   }
  }
  

  render () {
    const isSubscribe = this.props.isSubscribe;
    const form = isSubscribe ? (<Form onKeyDown={this.keyPress} name='subscribe' loading={this.props.subForm.loading === 'pending' ? true: false} widths="equal">
      <Form.Group>
        <FormInput data = {this.props.subForm.title}
                   onChange = {this.handleInputChange}
                   name = 'title'
                   label = 'Title'
                   placeholder = 'ФИО'   
                  />
        <FormInput data = {this.props.subForm.email}
                   onChange = {this.handleInputChange}
                   name = 'email'
                   label = 'Email'
                   placeholder = 'Адрес электронной почты'   
                  />
      </Form.Group>
      <CheckBoxMap loadingLevels={this.props.loadingLevels}
                   levelsError = {this.props.levelsError} 
                   hazardLevels={this.props.hazardLevels}
                   markedLevels = {this.props.hazardLevelsMarked}
      />
        <ButtonGroupSubmitClose submitAction={this.handleSubmit} history={this.props.history} />
    </Form>
    ) : (<Form onKeyDown={this.keyPress} loading={this.state.isLoading} widths="equal">
      <Form.Group>
        <FormInput data = {this.props.subForm.email}
                   onChange = {this.handleInputChange}
                   name = 'email'
                   label = 'Email'
                   placeholder = 'Адрес электронной почты'      
                  />
      </Form.Group>
        <ButtonGroupSubmitClose submitAction={this.handleSubmit} history={this.props.history}/>
    </Form>
    )
  return form;
  }
}

class SegmentForms extends PureComponent{
    constructor(props) {
      super (props);
    }


    render () {

      const isSubscribe = this.props.isSubscribe;
      const history = this.props.history; 
      const subForm = this.props.subForm;
      const fetchSubForm = this.props.fetchSubForm;
      
      return (
        <Container>
        <Segment.Group>
          <Segment centered="true">
            <Grid>
              <Grid.Column textAlign="center">
                { isSubscribe ? <Header as="h3" >Форма подписки на рассылку штормовых предупреждений</Header>
                : <Header as="h3" >Форма отказа от подписки на рассылку штормовых предупреждений</Header>
                }
                
              </Grid.Column>
            </Grid>
          </Segment>  
          <Segment centered="true" basic={true}>
             {this.props.subForm.responseError != null && 
             <MessageErrror message={responseErrorsHumanize(this.props.subForm.responseError)}/>}    
             <SubscribeForm isSubscribe = {isSubscribe} 
                            history={history} 
                            subForm = {this.props.subForm} 
                            setEmail = {this.props.setSubFormEmail}
                            setTitle = {this.props.setSubFormTitle} 
                            clearTitleError = {this.props.clearSubFormTitleError}
                            clearEmailError = {this.props.clearSubFormEmailError}
                            setTitleErrorRequired = {this.props.setSubFormTitleErrorRequired}
                            setEmailErrorRequired = {this.props.setSubFormEmailErrorRequired}
                            setEmailErrorFormat = {this.props.setSubFormEmailErrorFormat}
                            sendSubscribeRequest = {this.props.sendSubscribeRequest}
                            setMarkedLevels = {this.props.setMarkedLevels}
                            fetchSubForm = {fetchSubForm}
                            fetchHazardLevels = {this.props.fetchHazardLevels}
                            loadingLevels = {this.props.subForm.loadingLevels}
                            levelsError = {this.props.subForm.levelsError}
                            hazardLevels = {this.props.subForm.hazardLevels}
                            hazardLevelsMarked = {this.props.subForm.hazardLevelsMarked}
                            
              
             />
        </Segment>  
          </Segment.Group>
        </Container>
      )
    }

}

function mapStateToProps(state) {
  return {
    isSubscribe: state.isSubscribe,
    subForm: state.subForm,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSubFormEmail, setSubFormTitle, clearSubFormTitleError, 
    clearSubFormEmailError, setSubFormTitleErrorRequired,
    setSubFormEmailErrorFormat, setSubFormEmailErrorRequired,
    setSubFormInitial, fetchSubForm, fetchHazardLevels, setMarkedLevels
 }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SegmentForms))