import { Box } from '@mui/material';
import { Button } from 'src/shared/components/button/Button';
export type GapActionPlanFootersActionsType = {
  handleDiscardActionPlan: () => void;
  handleSaveActionPlan: () => void;
  textConfig?: {
    save: string;
    cancel: string;
  };
  saveDisable?: boolean;
  cancelDisable?: boolean;
};

const GapActionPlanFootersActions = ({
  handleDiscardActionPlan,
  handleSaveActionPlan,
  textConfig = {
    save: 'Save',
    cancel: 'Discard'
  },
  saveDisable = false,
  cancelDisable = false
}: GapActionPlanFootersActionsType) => {
  return (
    <Box
      sx={{ py: 4, px: 4 }}
      className="flex-basic-space-between w-100  bottomActionsShadow "
    >
      <Box className="flex-basic-end w-60">
        <Button
          variant="outlined"
          type="submit"
          className="mr-24"
          btnText={textConfig.cancel}
          onClick={handleDiscardActionPlan}
          sx={{
            py: '0.62rem',
            px: '2rem',
            minWidth: '125px'
          }}
          disabled={cancelDisable}
        />
        <Button
          variant="contained"
          type="submit"
          btnText={textConfig.save}
          onClick={handleSaveActionPlan}
          sx={{
            py: '0.62rem',
            px: '2rem',
            minWidth: '120px'
          }}
          disabled={saveDisable}
        />
      </Box>
    </Box>
  );
};

export default GapActionPlanFootersActions;
