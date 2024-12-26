import { createSlice } from '@reduxjs/toolkit';

export const recipientSlice = createSlice({
    name: 'recipient',
    initialState: {
        recipientFullName: '',
        recipientPhoneNumber: '',
        recipientAddress: '',
        zipCode: '',
        cityName: '',
    },
    reducers: {
        updateRecipient: (state, action) => {
            const {
                recipientFullName,
                recipientPhoneNumber,
                recipientAddress,
                zipCode,
                cityName,
            } = action.payload;

            state.recipientFullName = recipientFullName;
            state.recipientPhoneNumber = recipientPhoneNumber;
            state.recipientAddress = recipientAddress;
            state.zipCode = zipCode;
            state.cityName = cityName;
        },
        clearRecipient: (state) => {
            state.recipientFullName = '';
            state.recipientPhoneNumber = '';
            state.recipientAddress = '';
            state.zipCode = '';
            state.cityName = '';
        },
    },
});

export const { updateRecipient, clearRecipient } = recipientSlice.actions;

export default recipientSlice.reducer;
