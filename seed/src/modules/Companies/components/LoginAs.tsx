import Typography from 'src/shared/components/typography/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Button, Select, SimpleDialog } from 'src/shared/components/index';

interface GroupsInfo {
  groupName: string;
  roleDisplayName: string;
}
interface OrganizationsInfo {
  onboardedOn: string;
  orgName: string;
  orgUid: number;
}

interface InfoModal {
  orgName?: string;
  status?: string;
  orgType?: string;
  onboardedOn?: string;
  name?: string;
  email?: string;
  fullName?: string;
  organizationsUnderIt?: OrganizationsInfo[];
  groups?: GroupsInfo[];
}

interface LoginAsI {
  selectedValue: any;
  open: boolean;
  isPartner: boolean;
  handleClose: () => void;
  modalTitle?: string;
  onChange?: any;
  handleSubmit?: any;
  selectedBusiness?: string;
}

export const LoginAs = ({
  modalTitle,
  open,
  isPartner = false,
  selectedValue,
  handleClose,
  handleSubmit,
  selectedBusiness,
  onChange
}: any) => {
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SimpleDialog
      model_title={
        <Box sx={{ mb: '1.25rem' }} className="w-100">
          <Box className="textalign">
            <Typography variant="h3" className="textweight">
              {modalTitle}
            </Typography>
          </Box>
        </Box>
      }
      model_content={
        <Box
          sx={{
            pb: 15
          }}
        >
          <Box
            className={'text-center textItalic'}
            sx={{
              px: 8,
              pb: 5,
              minWidth: smallDevice ? '360px' : '670px'
            }}
          >
            {isPartner ? (
              <Typography variant="h4">{`Select the company you want to login as.`}</Typography>
            ) : (
              <Typography variant="h4">
                {`Are you sure you want to log in as ${selectedValue?.primaryAdmin} from ${selectedValue?.orgName}?`}
              </Typography>
            )}
          </Box>
          {isPartner && (
            <Box className="flex-basic-center" sx={{ px: 8 }}>
              <Box sx={{ width: '400px' }}>
                <Select
                  label={''}
                  placeholder="Select Company"
                  value={selectedBusiness || 'none'}
                  options={selectedValue?.businessOrganizationsUnderIt || []}
                  itemValue={'orgUid'}
                  itemText={'orgName'}
                  onChange={onChange}
                />
              </Box>
            </Box>
          )}
        </Box>
      }
      model_actions={
        <Box className="flex-basic-center w-100">
          <Button
            onClick={handleClose}
            variant="outlined"
            btnText="Cancel"
            sx={{ py: '0.62rem', px: '2rem' }}
          />

          <Button
            onClick={handleSubmit}
            variant="contained"
            btnText="Continue"
            disabled={selectedBusiness === 'none'}
            sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
          />
        </Box>
      }
      selectedValue={selectedValue}
      open={open}
      onClose={handleClose}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};
