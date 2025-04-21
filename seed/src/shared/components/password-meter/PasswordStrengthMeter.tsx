import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, useTheme } from '@mui/material';
import zxcvbn from 'zxcvbn';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { PASSWORD_STRENGTH_LABEL_BY_SCORE } from 'src/shared/constants/constants';

interface PasswordStrengthMeterProps {
  password: string;
  isError: boolean;
}

export const PasswordStrengthMeter = ({
  password,
  isError
}: PasswordStrengthMeterProps) => {
  // Constants
  const theme = useTheme();
  const MAX_PASSWORD_SCORE = 4;
  const MIN_PASSWORD_SCORE = 0;

  // State Values
  const [score, setScore] = useState(MIN_PASSWORD_SCORE);
  const [scorePercent, setScorePercent] = useState(MIN_PASSWORD_SCORE);
  const [strengthLabel, setStrengthLabel] = useState('');

  // Use Effects
  useEffect(() => {
    if (password) {
      const testedResult = zxcvbn(password);
      const calculatedScore =
        testedResult?.score > MIN_PASSWORD_SCORE && !isError
          ? (testedResult?.score / MAX_PASSWORD_SCORE) * 100
          : MIN_PASSWORD_SCORE;
      const currentScore =
        testedResult?.score > MIN_PASSWORD_SCORE && !isError
          ? testedResult?.score
          : MIN_PASSWORD_SCORE;
      setScorePercent(calculatedScore);
      setScore(currentScore);
    }
  }, [password]);
  useEffect(() => {
    setStrengthLabel(PASSWORD_STRENGTH_LABEL_BY_SCORE[score]);
  }, [score]);

  // HTML
  return (
    <>
      {!!password && (
        <Box sx={{ mt: 1 }}>
          <Box
            sx={{ mb: 1 }}
            className="text-small textColor-300 flex-basic-start textCapitalize"
          >
            <Box>Password strength:</Box>
            <Box sx={{ ml: 1 }}>{strengthLabel}</Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={scorePercent}
            className={clsx({
              ['passStrengthWeak']:
                strengthLabel === PASSWORD_STRENGTH_LABEL_BY_SCORE[0],
              ['passStrengthFair']:
                strengthLabel === PASSWORD_STRENGTH_LABEL_BY_SCORE[2],
              ['passStrengthGood']:
                strengthLabel === PASSWORD_STRENGTH_LABEL_BY_SCORE[3],
              ['passStrengthStrong']:
                strengthLabel === PASSWORD_STRENGTH_LABEL_BY_SCORE[4]
            })}
          />
        </Box>
      )}
    </>
  );
};

export default PasswordStrengthMeter;
