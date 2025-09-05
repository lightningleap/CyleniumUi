export interface Device {
  id: string;
  deviceId: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}

export const mockDevices: Device[] = [
  {
    id: '1',
    deviceId: 'ARMIA-0099',
    name: 'Main Office Device',
    type: 'SG-1',
    status: 'active',
  },
  {
    id: '2',
    deviceId: 'ARMIA-0098',
    name: 'Warehouse Scanner',
    type: 'SG-2',
    status: 'active',
  },
  {
    id: '3',
    deviceId: 'ARMIA-0097',
    name: 'Reception Kiosk',
    type: 'SG-1',
    status: 'inactive',
  },
  {
    id: '4',
    deviceId: 'ARMIA-0096',
    name: 'Field Tablet',
    type: 'SG-3',
    status: 'active',
  },
];