import React from 'react'
import { Pane, Spinner, SegmentedControl, Button } from 'evergreen-ui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getImages } from '../store/actions/image.action'
import { genericImage } from '../store/actions/image.action'

import NewImageForm from './image/NewImageForm'

class AnotherNavBar extends React.PureComponent {
  newImageButton () {
    const { showNewImageForm, genericImages} = this.props
    return <Button 
      marginRight={12} 
      iconBefore='add'
      paddingLeft={35}
      paddingRight={30}
      height={26}
      onClick={() => {
        const imageForm = !showNewImageForm
        genericImages({
          showImagePage: false,
          showNewImageForm: imageForm,
        })
        if(imageForm) {
          getImages('all')
        }
      }}>Pull New Image</Button>
  }
  renderBody () {
    const { showNewImageForm, showImagePage } = this.props
    if(showNewImageForm) {
      return <NewImageForm />
    } 
    else {
      return this.newImageButton()
    }
    // else if (showImagePage) {
    //   return this.newImageButton()
    // } 
    // else {
    //   return this.ImageFilters()
    // }
  }
  render() {
    return <Pane 
      backgroundColor="#f1f1f1" 
      display="flex" 
      justifyContent="center"
      padding={10}>
        {/* {this.groupsToggler()} */}
        {this.renderBody()}
      </Pane>
  }

}
const mapStateToProps = state => {
  return {
    segment: state.image.segment,
    loading: state.image.loading,
    showImagePage: state.image.showImagePage,
    showNewImageForm: state.image.showNewImageForm,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getImages,
    genericImage,
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)( AnotherNavBar )