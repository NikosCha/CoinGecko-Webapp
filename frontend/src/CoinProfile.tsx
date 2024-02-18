import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, IconButton, Box, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularSkeleton, StyledContainer, TextSkeleton, Image, DescriptionBox, PriceChangeBox } from './CoinProfileStyles';

interface PriceChangeInterface {
    "24h": string,
    "7d": string,
    "14d": string,
    "30d": string,
    "60d": string,
    "200d": string,
    "1y": string,
}

interface DataItem {
    name: string;
    current_price: string;
    image: string;
    description: string;
    price_change_percentage: PriceChangeInterface;
    high_24h: string;
    low_24h: string;
    price_change_percentage_24h: string;
}

const CoinProfile: React.FC= () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<DataItem>();
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3001/api/coins/${id}`
          );
          const json = await response.json();
          setData(json.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <StyledContainer>
      <IconButton onClick={() => navigate(-1)} aria-label="back">
        <ArrowBackIcon />
        <span> Back to market </span>
      </IconButton>
      {
        loading ? 
        (
            <Box display="flex" flexDirection="column">
              <CircularSkeleton variant="circular" width={100} height={100} />
              <TextSkeleton variant="text" width={210} height={60} />
              <TextSkeleton variant="text" width={200} />
              <TextSkeleton variant="rectangular" width={300} height={118} />
              <TextSkeleton variant="text" width={200} />
              <TextSkeleton variant="text" width={200} />
              <TextSkeleton variant="text" width={200} />
              <TextSkeleton variant="text" width={200} />
              <TextSkeleton variant="text" width={200} />
              <TextSkeleton variant="text" width={200} />
              <TextSkeleton variant="text" width={200} />
            </Box>
          )
        : data ?  

        <div>
        <Typography variant="h4">{data.name} </Typography>
        <Box display="flex" flexDirection="column" >
          <Image src={data.image} alt={data.name} />
          <Typography variant="body1">Current Price: {data.current_price}</Typography>
          <Typography variant="body1">Coin Name: {data.name}</Typography>
          <DescriptionBox dangerouslySetInnerHTML={{ __html: data.description }} />
          <PriceChangeBox>
            <Typography variant="body1">Price Change </Typography>
            <Typography variant="body2">24 Hours: {parseFloat(data.price_change_percentage['24h']).toFixed(2)}%</Typography>
            <Typography variant="body2">7 Days: {parseFloat(data.price_change_percentage['7d']).toFixed(2)}%</Typography>
            <Typography variant="body2">14 Days: {parseFloat(data.price_change_percentage['14d']).toFixed(2)}%</Typography>
            <Typography variant="body2">1 Month: {parseFloat(data.price_change_percentage['30d']).toFixed(2)}%</Typography>
            <Typography variant="body2">2 Month: {parseFloat(data.price_change_percentage['60d']).toFixed(2)}%</Typography>
            <Typography variant="body2">200 Days: {parseFloat(data.price_change_percentage['200d']).toFixed(2)}%</Typography>
            <Typography variant="body2">1 Year: {parseFloat(data.price_change_percentage['1y']).toFixed(2)}%</Typography>
          </PriceChangeBox>
          <Typography variant="body1">High 24h: {data.high_24h}</Typography>
          <Typography variant="body1">Low 24h: {data.low_24h}</Typography>
        </Box>
        </div>
        : <Typography>No Data Available</Typography>

      }
    </StyledContainer>
  );
};

export default CoinProfile;
