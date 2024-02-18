import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DataItem {
  id: number;
  name: string;
  symbol: string;
  image: string;
  current_price: string;
  high_24h: string;
  low_24h: string;
  price_change_percentage_24h: string;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id: number | string) => {
    navigate(`/coin/${id}`);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/coins/markets?page=${
          page + 1
        }&perPage=${rowsPerPage}`
      );
      const json = await response.json();
      setData(json.data.coins);
      setTotalCount(json.data.total);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Market Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>High 24h</TableCell>
              <TableCell>Low 24h</TableCell>
              <TableCell>Price Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? [...Array(rowsPerPage)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}/>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : data.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    onClick={() => handleRowClick(item.id)}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.symbol.toUpperCase()}</TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.current_price} $</TableCell>
                    <TableCell>{item.high_24h} $</TableCell>
                    <TableCell>{item.low_24h} $</TableCell>
                    <TableCell
                      style={{
                        color:
                          parseFloat(item.price_change_percentage_24h) > 0
                            ? "green"
                            : parseFloat(item.price_change_percentage_24h) < 0
                            ? "red"
                            : "inherit",
                      }}
                    >
                      {`${parseFloat(item.price_change_percentage_24h).toFixed(
                        2
                      )}%`}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default DataTable;
