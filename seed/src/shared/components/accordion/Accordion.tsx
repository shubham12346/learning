import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export type AccordionPropType ={
  id :string,
  expanded :boolean,
  expandIcon :React.ReactNode,
  accordionSummary :any,
  accordionDetails:any
  onChange:any
}

export default function ControlledAccordions(props:AccordionPropType) {
  const {
    id = '',
    expanded,
    expandIcon,
    accordionSummary,
    accordionDetails,
    onChange
  } = props;

  return (
    <div>
      <Accordion expanded={expanded === Boolean(id)} onChange={onChange(id)}>
        <AccordionSummary expandIcon={expandIcon}>
          {accordionSummary}
        </AccordionSummary>
        <AccordionDetails>{accordionDetails}</AccordionDetails>
      </Accordion>
    </div>
  );
}
