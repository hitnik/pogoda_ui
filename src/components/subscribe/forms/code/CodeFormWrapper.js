import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/mapStateToProps'
import mapDispatchToProps from '../../../../store/mapDispatchToProps'
import  CodeForm  from "."

const CodeFormWrapper = connect(mapStateToProps("CodeForm"),
                            mapDispatchToProps("CodeForm"))(CodeForm);

export default CodeForm;