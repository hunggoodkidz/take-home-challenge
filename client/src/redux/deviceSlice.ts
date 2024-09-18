import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  devices: string[];
}

const initialState: DeviceState = {
  devices: [],
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<string[]>) => {
      state.devices = action.payload;
    },
    addDevice: (state, action: PayloadAction<string>) => {
      state.devices.push(action.payload);
    },
    removeDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter(device => device !== action.payload);
    },
  },
});

export const { setDevices, addDevice, removeDevice } = deviceSlice.actions;
export default deviceSlice.reducer;