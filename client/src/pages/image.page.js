import React from 'react'

import AnotherNavBar from '../components/AnotherNavBar'
import ImageLists from '../components/image/imageLists'
import Modal from '../components/container/deleteModal'
import NewImageForm from '../components/image/NewImageForm'

import { bindActionCreators } from 'redux'
import { toggleDeleteModal, resetLogSideSheet } from '../store/actions/container.action'

class ImagePage extends React.PureComponent {
  render () {
    const { selectedImage, toggleDeleteModal, 
    resetLogSideSheet, isShowingSideSheet, logData } = this.props
    return <>
      <AnotherNavBar />
      <div className="subnavaware-view">
        {
          <ImageLists />
        }
      </div>
    </>
  }
  // render () {
  //   return <>
  //     <ImageLists />
  //   </>
  // }
}
const mapStateToProps = state => {
  return {
    showImagePage: state.groups.showImagePage,
    showModal: state.image.showModal,
    selectedImage: state.image.selectedImage,
    isShowingSideSheet: state.image.isShowingSideSheet,
    logData: state.image.logData
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    toggleDeleteModal,
    resetLogSideSheet
  },
  dispatch
)

export default ImagePage