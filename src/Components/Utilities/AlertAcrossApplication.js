import React, { useState, useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { AlertAcrossApplicationContext } from '../../Context/AlertAcrossApplicationContext'

// This serves as alerts sections for the application

function AlertAcrossApplication() {


  const { showAlert, variantAlert, alertHeading, alertText } = useContext(AlertAcrossApplicationContext);

  const [stateShowAlert, setStateShowAlert] = showAlert;
  const [stateVariantAlert, setStateVariantAlert] = variantAlert;
  const [stateAlertHeading, setStateAlertHeading] = alertHeading;
  const [StateAlertText, setStateAlertText] = alertText;



  if (stateShowAlert) {
    return (

      <div id="GlobalAlerts">
        <Alert variant={stateVariantAlert} onClose={() => {

          setStateShowAlert(false)
          setStateVariantAlert(false)
          setStateAlertHeading(false)
          setStateAlertText(false)
        }

        } dismissible>
          <Alert.Heading>{stateAlertHeading}</Alert.Heading>

          <p>
            {StateAlertText}
          </p>

        </Alert>
      </div>
    );
  }

  else {
    return (

      <div>

      </div>
    )
  }

}


export default AlertAcrossApplication;