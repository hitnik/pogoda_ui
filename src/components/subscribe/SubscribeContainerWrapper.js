import { connect } from 'react-redux';
import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import  SubscribeContainer  from "."

const SubscribeContainerWrapper = connect(mapStateToProps("SubscribeContainer"), mapDispatchToProps("SubscribeContainer"))(SubscribeContainer);

export default SubscribeContainerWrapper;