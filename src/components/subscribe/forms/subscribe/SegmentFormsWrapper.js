import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/mapStateToProps'
import mapDispatchToProps from '../../../../store/mapDispatchToProps'
import  SegmentForms  from "."

const SegmentFormsWrapper = connect(mapStateToProps("SegmentForms"),
                            mapDispatchToProps("SegmentForms"))(SegmentForms);

export default SegmentFormsWrapper;