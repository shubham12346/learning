import React from 'react';
export type adLineBreakType = {
  text: string;
};
const AddLineBreak = ({ text }: adLineBreakType) => {
  return (
    <>
      {text?.split('\n')?.map((line, index) => (
        <React.Fragment key={`${index}-${line?.charAt(0)}`}>
          {line}
          {index !== text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

export default AddLineBreak;
