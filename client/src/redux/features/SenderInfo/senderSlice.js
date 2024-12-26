import { createSlice } from '@reduxjs/toolkit';

export const senderSlice = createSlice({
    name: 'sender',
    initialState: {
        senderFullName: '',
        senderPhoneNumber: '',
        senderEmailAddress: '',
    },
    reducers: {
        updateSender: (state, action) => {
            const { senderFullName, senderPhoneNumber, senderEmailAddress } = action.payload;
            state.senderFullName = senderFullName;
            state.senderPhoneNumber = senderPhoneNumber;
            state.senderEmailAddress = senderEmailAddress;
        },
    },
});

export const { updateSender } = senderSlice.actions;

export default senderSlice.reducer;
