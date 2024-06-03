import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CollegeSelector from './CollegeSelector';
import axios from 'axios';

const Dashboard = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [loadingLogo, setLoadingLogo] = useState(false);

  const handleCollegeSelect = async (college) => {
    setSelectedCollege(college);
    if (college) {
      setLoadingLogo(true);
      try {
        const response = await axios.get(`https://logo.clearbit.com/${college.domains[0]}`);
        setLogoUrl(response.config.url);
      } catch (error) {
        setLogoUrl('');
        console.error('Error fetching college logo:', error);
      } finally {
        setLoadingLogo(false);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <CollegeSelector onCollegeSelect={handleCollegeSelect} />
      {selectedCollege && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6">{selectedCollege.name}</Typography>
          {loadingLogo ? (
            <CircularProgress />
          ) : (
            logoUrl ? (
              <img src={logoUrl} alt={`${selectedCollege.name} logo`} width={200} />
            ) : (
              <Typography variant="body1">Logo not available</Typography>
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
