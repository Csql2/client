// @flow
import * as Constants2 from '../../../../constants/chat2'
// import * as Constants from '../../../constants/chat'
import * as Types from '../../../../constants/types/chat2'
import * as Chat2Gen from '../../../../actions/chat2-gen'
// import * as KBFSGen from '../../../actions/kbfs-gen'
// import * as Selectors from '../../../constants/selectors'
// import * as I from 'immutable'
// import HiddenString from '../../../util/hidden-string'
import ListComponent from '.'
import {connect, type TypedState, type Dispatch} from '../../../../util/container'
// import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
// import {navigateAppend} from '../../../actions/route-tree'

// const getValidatedState = (state: TypedState) => {
// const selectedConversationIDKey = Constants.getSelectedConversation(state)
// if (!selectedConversationIDKey) {
// return false
// }
// const untrustedState = 'unboxed' // TODO state.chat.inboxUntrustedState.get(selectedConversationIDKey)
// if (selectedConversationIDKey && Constants.isPendingConversationIDKey(selectedConversationIDKey)) {
// if (Constants.pendingConversationIDKeyToTlfName(selectedConversationIDKey)) {
// // If it's as pending conversation with a tlfname, let's call it valid
// return true
// }
// }
// return ['reUnboxing', 'unboxed'].includes(untrustedState)
// }

// // TODO
// const supersedesIfNoMoreToLoadSelector = () => false
// // createSelector(
// // [Constants.getSelectedConversationStates, Constants.getSupersedes],
// // (conversationState, _supersedes) =>
// // conversationState && !conversationState.moreToLoad ? _supersedes : null
// // )

// const ownPropsSelector = (_, {editLastMessageCounter, listScrollDownCounter, onFocusInput}: OwnProps) => ({
// editLastMessageCounter,
// listScrollDownCounter,
// onFocusInput,
// })

// const immutableCreateSelector = createSelectorCreator(defaultMemoize, (a, b) => a === b || I.is(a, b))

// const getMessageKeysForSelectedConv = (state: TypedState) => {
// const conversationIDKey = Constants.getSelectedConversation(state)
// if (!conversationIDKey) {
// return I.List()
// }
// const convMsgs = Constants.getConversationMessages(state, conversationIDKey)
// return convMsgs.messages
// }

// const getDeletedIDsForSelectedConv = (state: TypedState) => {
// const conversationIDKey = Constants.getSelectedConversation(state)
// if (!conversationIDKey) {
// return I.Set()
// }
// return Constants.getDeletedMessageIDs(state, conversationIDKey)
// }

// const messageKeysSelector = immutableCreateSelector(
// [getMessageKeysForSelectedConv, getDeletedIDsForSelectedConv],
// (ks, deletedIDs) => {
// if (deletedIDs.count()) {
// return ks
// .filterNot(k => {
// const {messageID} = Constants.splitMessageIDKey(k)
// return deletedIDs.has(messageID)
// })
// .toList()
// }
// return ks.toList()
// }
// )

// const convStateProps = createSelector(
// [Constants.getSelectedConversation, supersedesIfNoMoreToLoadSelector, getValidatedState],
// (selectedConversation, _supersedes, validated) => ({
// validated,
// _supersedes,
// selectedConversation,
// })
// )

// // TODO this is temp until we can discuss a better solution to this getMessageFromMessageKey thing
// let _stateHack
// const mapStateToProps = createSelector(
// [state => state, ownPropsSelector, Selectors.usernameSelector, convStateProps, messageKeysSelector],
// (state, ownProps, username, convStateProps, messageKeys) => {
// _stateHack = state
// const meta = Constants2.getMeta(state, convStateProps.selectedConversation)
// return {
// editLastMessageCounter: ownProps.editLastMessageCounter,
// listScrollDownCounter: ownProps.listScrollDownCounter,
// messageKeys,
// onFocusInput: ownProps.onFocusInput,
// selectedConversation: convStateProps.selectedConversation,
// validated: convStateProps.validated,
// you: username,
// hasResetUsers: !meta.resetParticipants.isEmpty(),
// _supersedes: convStateProps._supersedes,
// }
// }
// )

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
// _onDownloadAttachment: messageKey => {
// dispatch(ChatGen.createSaveAttachment({messageKey}))
// },
// _onLoadMoreMessages: (conversationIDKey: Types.ConversationIDKey) => {
// dispatch(ChatGen.createLoadMoreMessages({conversationIDKey, onlyIfUnloaded: false}))
// },
// onDeleteMessage: (message: Types.Message) => {
// dispatch(ChatGen.createDeleteMessage({message}))
// },
// onEditMessage: (message: Types.Message, body: string) => {
// dispatch(ChatGen.createEditMessage({message, text: new HiddenString(body)}))
// },
// onOpenInFileUI: (path: string) => dispatch(KBFSGen.createOpenInFileUI({path})),
// onMessageAction: (
// message: Types.Message,
// localMessageState?: Types.LocalMessageState,
// onShowEditor?: () => void,
// onPopupWillClose?: () => void,
// targetRect?: ?ClientRect
// ) => {
// dispatch(
// navigateAppend([
// {
// props: {
// targetRect,
// message,
// localMessageState,
// onShowEditor,
// onPopupWillClose,
// position: 'bottom left',
// },
// selected: 'messageAction',
// },
// ])
// )
// },
// })

// const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): Props => {
// let messageKeysWithHeaders = stateProps.messageKeys
// const selected = stateProps.selectedConversation
// if (selected) {
// messageKeysWithHeaders = messageKeysWithHeaders.withMutations(l => {
// if (stateProps._supersedes) {
// l.unshift(Constants.messageKey(selected, 'supersedes', Constants.selfInventedIDToMessageID(-1)))
// }
// l.unshift(Constants.messageKey(selected, 'header', Constants.selfInventedIDToMessageID(-1)))
// if (stateProps.hasResetUsers) {
// l.push(Constants.messageKey(selected, 'resetUser', Constants.selfInventedIDToMessageID(-1)))
// }
// })
// }

// const getMessageFromMessageKey = (messageKey: Types.MessageKey) =>
// Constants.getMessageFromMessageKey(_stateHack, messageKey)

// return {
// editLastMessageCounter: stateProps.editLastMessageCounter,
// getMessageFromMessageKey,
// listScrollDownCounter: stateProps.listScrollDownCounter,
// messageKeys: messageKeysWithHeaders,
// onDeleteMessage: dispatchProps.onDeleteMessage,
// onEditMessage: dispatchProps.onEditMessage,
// onFocusInput: stateProps.onFocusInput,
// onDownloadAttachment: messageKey => {
// stateProps.selectedConversation && dispatchProps._onDownloadAttachment(messageKey)
// },
// onLoadMoreMessages: () => {
// stateProps.selectedConversation && dispatchProps._onLoadMoreMessages(stateProps.selectedConversation)
// },
// onMessageAction: dispatchProps.onMessageAction,
// onOpenInFileUI: dispatchProps.onOpenInFileUI,
// selectedConversation: stateProps.selectedConversation,
// validated: stateProps.validated,
// you: stateProps.you,
// }
// }

// export default compose(connect(mapStateToProps, mapDispatchToProps, mergeProps))(ListComponent)
const mapStateToProps = (state: TypedState) => {
  const _selectedConversation = Constants2.getSelectedConversation(state)
  return {
    _selectedConversation,
    messageOrdinals: Constants2.getMessageOrdinals(state, _selectedConversation),
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  _loadMoreMessages: (conversationIDKey: Types.ConversationIDKey) =>
    dispatch(Chat2Gen.createLoadMoreMessages({conversationIDKey})),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  loadMoreMessages: () => {
    stateProps._selectedConversation && dispatchProps._loadMoreMessages(stateProps._selectedConversation)
  },
  messageOrdinals: stateProps.messageOrdinals.toList(),
  onFocusInput: ownProps.onFocusInput,
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListComponent)