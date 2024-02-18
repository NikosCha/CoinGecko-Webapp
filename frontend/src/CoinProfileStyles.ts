import styled from '@emotion/styled';
import { Container, Box, Skeleton } from '@mui/material';

export const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

export const CircularSkeleton = styled(Skeleton)`
  margin: 20px auto;
`;

export const TextSkeleton = styled(Skeleton)`
  margin-bottom: 10px;
`;

export const Image = styled.img`
  max-width: 100px;
  border-radius: 50%;
`;

export const DescriptionBox = styled.div`
  max-width: 600px;
  margin-top: 10px;
`;

export const PriceChangeBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 20px;
  margin-bottom: 20px;
`;
