import React from 'react'
import { Pane, Button, TextInput, IconButton } from 'evergreen-ui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { genericImage, pullImage } from '../../store/actions/image.action'

class NewImageForm extends React.PureComponent {

  state = {
    toggleLink: false,
  }

  handleSubmit () {
    const { pullImage, newImageName} = this.props
    pullImage({image: newImageName})
  }

  render () {
    const { newImageName, genericImage, createFormLoading } = this.props
    return <Pane 
      display='flex'
      justifyContent='center'
      alignItems='center'>
        <Pane>
          <TextInput
            name="text-input-name"
            placeholder="New Image Name"
            height={26}
            display='flex'
            flexGrow={1}
            onChange={e => {
              genericImage({
                newImageName: e.target.value
              })
            }}
            value={newImageName}
          />
        </Pane>
        <Pane display="flex" style={{height: '100%'}}>
          {/*<IconButton 
            icon="link" 
            height={26} 
            marginLeft={6} 
            onClick={e => {
              e.preventDefault()
              this.setState({
                toggleLink: !this.state.toggleLink
              })
            }}
          />
          */}
          <Button
            height={26}
            appearance="primary"
            marginLeft={6}
            intent="success"
            //disabled={(selectedItems.length <= 0) || (newImageName === '')}
            isLoading={createFormLoading}
            onClick={(e) => {
              e.preventDefault()
              this.handleSubmit()
            }}
          >
            Pull Image
          </Button>
        </Pane>
    </Pane>
  }
}

const mapStateToProps = state => {
  return {
    newImageName: state.image.newImageName,
    createFormLoading: state.image.createFormLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    pullImage,
    genericImage,
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)( NewImageForm )