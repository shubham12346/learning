import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PartnerCompanies } from './components/PartnerCompanies';
import { RegCompaniesView } from './components/RegCompaniesView';
import { selectCommon } from '../common/services/common.service';
import { ORGANIZATION_ROLE_ENUM } from 'src/shared/constants/constants';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Tenants = (props) => {
  const { userData } = useSelector(selectCommon);
  const [isRegversAdmin, setIsRegversAdmin] = useState<any>(false);

  useEffect(() => {
    if (Object.keys(userData).length) {
      if (
        userData?.authorities[0].role ==
        ORGANIZATION_ROLE_ENUM.ADMINISTRATION_ADMIN
      ) {
        setIsRegversAdmin(true);
      }
    }
  }, [userData]);

  return (
    <Container maxWidth={'xl'}>
      {isRegversAdmin ? (
        <RegCompaniesView {...props} />
      ) : (
        <PartnerCompanies {...props} />
      )}
    </Container>
  );
};
export default Tenants;
