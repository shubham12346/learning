import React, { useEffect, useState } from 'react';
import MuiPhoneNumber, { MuiPhoneNumberProps } from 'material-ui-phone-number';
interface CustomProps {
  isOptional?: boolean;
}

type CombinedProps = CustomProps & MuiPhoneNumberProps;

export const PhoneNumber = React.forwardRef<any, CombinedProps>(
  ({ isOptional, ...props }: CombinedProps, ref: any) => {
    const [label, setLabel] = useState('');

    useEffect(() => {
      if (props.label) {
        setLabel(isOptional ? `${props.label} (optional)` : `${props.label}`);
      }
    }, []);

    return (
      <MuiPhoneNumber {...props} label={label} defaultCountry="IND" ref={ref} />
    );
  }
);
export default PhoneNumber;
