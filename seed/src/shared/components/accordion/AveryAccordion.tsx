import { useEffect, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export type MyAccordionPropType = {
  expanded: string;
  accordianId: string;
  handleChange: (accordionId: string) => void;
  accordianList: { id: number | string; name: string }[];
  accordianHeader: { heading1: string; sectionNo: number };
  accordianImage: boolean;
  isLoaderShow: boolean;
  getRegulationDetailsByID: (item: any) => void;
  accordionListActiveItem: string;
  handleClick?: any;
};
let callTime;
const AveryAccordion = (props: MyAccordionPropType) => {
  const {
    expanded,
    accordianId,
    handleChange,
    accordianList,
    accordianHeader,
    isLoaderShow = false,
    getRegulationDetailsByID,
    accordionListActiveItem,
    accordianImage
  } = props;

  //constant
  const { t } = useTranslation('regulations');
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollToSelectedAccordionItem() {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }
  //useEffect
  useEffect(() => {
    if (accordionListActiveItem && accordianList?.length) {
      callTime = setTimeout(() => {
        scrollToSelectedAccordionItem();
      }, 200);

      return () => {
        clearTimeout(callTime);
      };
    }
  }, [accordianList?.length, accordionListActiveItem]);
  return (
    <Accordion
      expanded={expanded === accordianId}
      onChange={() => handleChange(accordianId)}
      className="collapseWrapper"
    >
      <AccordionSummary>
        <Box className="flex-basic-space-between w-100">
          <Box>
            <Typography variant="subtitle1" className="heading1">
              {accordianHeader.heading1}
            </Typography>
            <Box className="d-flex">
              <Typography variant="body1" className="heading1">
                {t('regulationsLabel')}
              </Typography>
              <Box sx={{ ml: 1 }}>
                <strong>{accordianHeader.sectionNo}</strong>
              </Box>
            </Box>
          </Box>
          {accordianImage ? (
            <Box className="d-flex">
              <Box className="arrowBox flex-basic-center">
                <Box
                  className={
                    expanded === accordianId
                      ? 'icon-dropdown icon-rotate-top'
                      : 'icon-dropdown'
                  }
                ></Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </AccordionSummary>
      <Box>
        {isLoaderShow ? (
          <Box className="flex-basic-center exmptyBox">
            <Box className="spinnerLoading"></Box>
          </Box>
        ) : (
          <Box>
            {accordianList?.map((item: any) => {
              return (
                <Box
                  className={clsx(
                    accordionListActiveItem === item?.id
                      ? 'activeAccordionItem'
                      : '',
                    'd-flex cursorPointer accordionList'
                  )}
                  onClick={() => getRegulationDetailsByID(item)}
                  sx={{ mb: 4 }}
                  key={item?.id}
                  ref={
                    expanded === accordianId &&
                    accordionListActiveItem === item?.id
                      ? scrollRef
                      : null
                  }
                >
                  <Box className="d-flex align-items-center mr-12">
                    <Box className="dotshow" />
                  </Box>
                  <Typography variant="subtitle2">{item?.name}</Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Accordion>
  );
};

export default AveryAccordion;
