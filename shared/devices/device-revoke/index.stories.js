// @flow
import * as React from 'react'
import {action, storiesOf} from '../../stories/storybook'
import DeviceRevoke, {type Props} from '.'

const devicesProps: Props = {
  currentDevice: true,
  deviceID: 'my computer',
  endangeredTLFs: ['nathunsmitty', 'nathunsmitty,chrisnojima', 'nathunsmitty,chrisnojima,jacobyoung'],
  icon: 'icon-paper-key-revoke-48',
  name: 'my computer',
  onCancel: action('oncancel'),
  onSubmit: action('onsubmit'),
  waiting: false,
}

const load = () => {
  storiesOf('Devices/Revoke', module).add('Current Device', () => <DeviceRevoke {...devicesProps} />)
}

export default load