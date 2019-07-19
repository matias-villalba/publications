const boundUpdateActivationStateOfNavButtons = (buttons) => dispatch => dispatch(updateActivationStateOfNavButtons(buttons))

export {boundUpdateActivationStateOfNavButtons as updateActivationStateOfNavButtons } 

function updateActivationStateOfNavButtons(buttons) {    
    return {
      type: 'PAGE.NAVIGATION.UPDATE_ACTIVATION_STATE_OF_NEXT_AND_PREVIOUS_BUTTONS',
      payload: buttons
    }
}


