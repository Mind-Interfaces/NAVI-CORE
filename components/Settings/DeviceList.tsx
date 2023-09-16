import { Label, Select } from '@rebass/forms'
import React from 'react'
import { Flex } from 'rebass'
import { trackHandler, useUneeqDeviceList } from 'uneeq-react-core'
import styles from './styles'
import { useTranslation } from 'react-i18next'

interface DevicesProps {
  deviceType: string
}
const Devices: React.FC<DevicesProps> = ({ deviceType }) => {
  const { devices, selectedDevices, setDevice } = useUneeqDeviceList()
  const { t } = useTranslation()

  return (
    <Flex
      sx={{
        ...styles.deviceList,
        display:
          deviceType === 'audioInput'
            ? ['none', 'none', 'none', 'flex']
            : 'flex'
      }}
    >
      <Label htmlFor="device">
        {deviceType === 'audioInput' ? 'Mic' : 'Speakers'}
      </Label>
      <Select
        sx={styles.select}
        id="device"
        name="device"
        defaultValue={
          selectedDevices[deviceType] ? selectedDevices[deviceType] : 'Default'
        }
        onChange={trackHandler(
          e => setDevice(deviceType, e.target.value),
          `device-list-${deviceType}-item`
        )}
      >
        {devices[deviceType].length > 0 ? (
          devices[deviceType].map((device: MediaDeviceInfo) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))
        ) : (
          <option key="default" value="default">
            {t('Settings.DeviceList.default')}
          </option>
        )}
      </Select>
    </Flex>
  )
}

export default Devices
