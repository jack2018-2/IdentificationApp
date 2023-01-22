import React from 'react';
import InputMask from 'react-input-mask';

const PhoneInput = (props: any) => {
    return <InputMask {...props} mask="+7999 999 99 99" maskChar=" " />;
}

export default PhoneInput;