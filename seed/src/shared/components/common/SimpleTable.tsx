import { Box, Card, Container, Typography, useTheme } from '@mui/material';
import Header from 'src/core/header/Header';
import Footer from 'src/core/footer/Footer';
import { Button } from '../button/Button';

interface SimpleTableProps {
  tableHeadings: any[];
  tableData: any[];
}

export const SimpleTable = ({ tableData, tableHeadings }: SimpleTableProps) => {
  const theme = useTheme();

  return (
    <Box>
      <table aria-describedby="role type">
        <tr>
          {tableHeadings.map((heading, index) => (
            <th key={index}>
              <Typography variant="body2" className="textsemiWeight">
                {heading}
              </Typography>
            </th>
          ))}
        </tr>

        {tableData.map((ele, index) => (
          <tr key={index}>
            <td>
              <Typography variant="body1" className="font-weight-regular">
                {ele.groupName}
              </Typography>
            </td>
            <td>
              <Typography variant="body1" className="font-weight-regular">
                {ele.roleDisplayName}
              </Typography>
            </td>
          </tr>
        ))}
      </table>
    </Box>
  );
};

export default SimpleTable;
