import React from 'react'
import { Pane, Spinner, SegmentedControl, Button, Textarea, Dialog, Text } from 'evergreen-ui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getImages } from '../store/actions/image.action'
import { genericImage } from '../store/actions/image.action'

import NewImageForm from './image/NewImageForm'

class AnotherNavBar extends React.PureComponent {
  state = {
    isTextDialogShown: false,
    textContent: ''
  }

  newImageButton () {
    const { showNewImageForm, genericImage} = this.props
    return <Button 
      marginRight={12} 
      iconBefore='add'
      paddingLeft={35}
      paddingRight={30}
      height={26}
      onClick={() => {
        const imageForm = !showNewImageForm
        genericImage({
          showImagePage: false,
          showNewImageForm: imageForm,
        })
        if(imageForm) {
          getImages()
        }

      }}>Pull New Image</Button>

  }

  textBoxButton() {
    return (
      <>
        <Button 
          marginRight={12} 
          iconBefore='edit'
          paddingLeft={35}
          paddingRight={30}
          height={26}
          onClick={() => this.setState({ isTextDialogShown: true })}
        >
          Add Text
        </Button>

        <Dialog
          isShown={this.state.isTextDialogShown}
          title="Enter Text"
          onCloseComplete={() => this.setState({ isTextDialogShown: false })}
          confirmLabel="Save"
          onConfirm={() => {
            // Handle the text content here
            console.log(this.state.textContent)
            this.setState({ isTextDialogShown: false })
          }}
        >
          <Textarea
            value={this.state.textContent}
            onChange={e => this.setState({ textContent: e.target.value })}
            placeholder="Enter your text here..."
            width="100%"
            height={200}
          />
        </Dialog>
      </>
    )
  }

  renderBody () {
    const { showNewImageForm, showImagePage } = this.props
    if(showNewImageForm) {
      return <NewImageForm />
    } 
    else {
      return (
        <Pane display="flex" padding={16} background="tint1" borderRadius={3}>
          <Pane flex={1} alignItems="center" display="flex">
            <Pane display="flex" alignItems="center">
              {this.newImageButton()}
              {this.textBoxButton()}
            </Pane>
            <Pane marginLeft={20}>
              <Text>{this.props.title}</Text>
            </Pane>
          </Pane>
          <Pane>
            {/* ... other elements ... */}
          </Pane>
        </Pane>
      )
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