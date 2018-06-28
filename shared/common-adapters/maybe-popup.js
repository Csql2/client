// @flow
import * as React from 'react'
import Box from './box'
import PopupDialog from './popup-dialog'
import {connect, type Dispatch} from '../util/container'
import {globalColors, isMobile} from '../styles'

const MaybePopup = isMobile
  ? (props: {onClose: () => void, children: React.Node}) => (
      <Box style={{height: '100%', width: '100%'}} children={props.children} />
    )
  : (props: {
      onClose: () => void,
      children: React.Node,
      cover?: boolean,
      styleCover?: any,
      styleContainer?: any,
    }) => (
      <PopupDialog
        onClose={props.onClose}
        styleCover={props.cover ? {..._styleCover, ...props.styleCover} : {}}
        styleContainer={props.cover ? {..._styleContainer, ...props.styleContainer} : {}}
        children={props.children}
      />
    )

// TODO properly type this
const DispatchNavUpHoc: any = connect(undefined, (dispatch: Dispatch, {navigateUp}) => ({
  connectedNavigateUp: () => dispatch(navigateUp()),
}))

// TODO properly type this
const _MaybePopupHoc: any = (cover: boolean) => {
  return WrappedComponent => props => {
    const onClose = props.onClose || props.connectedNavigateUp
    return (
      <MaybePopup onClose={onClose} cover={!!cover}>
        <WrappedComponent onClose={onClose} {...props} />
      </MaybePopup>
    )
  }
}

type MaybePopupHocType<P> = (
  cover: boolean
) => (WrappedComponent: React.ComponentType<P>) => React.ComponentType<P>
const MaybePopupHoc: MaybePopupHocType<any> = (cover: boolean) => Component =>
  DispatchNavUpHoc(_MaybePopupHoc(cover)(Component))

const _styleCover = {
  alignItems: 'stretch',
  backgroundColor: globalColors.black_75,
  justifyContent: 'stretch',
}

const _styleContainer = {
  height: '100%',
}

export {MaybePopup, MaybePopupHoc}
