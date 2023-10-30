import Button from "@mui/material/Button";
import { getAllUniIds, getUniData } from "../../../utils/uni_list_id";
import { createUniLink } from "../../../utils/helpers";
import "./university.css";

//import for table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

export default function University({ params }: any) {
  const { id } = params;
  const data: any = getUniData(params.id);
  if (data) {
    const {
      name,
      country,
      web_pages,
      alpha_two_code,
      "state-province": state_province,
      domains,
    } = data;
    return (
      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Web pages</TableCell>
                <TableCell>Domains</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell>
                  {state_province ? `${state_province}, ` : ""}
                  {country} ({alpha_two_code})
                </TableCell>
                <TableCell>
                  {web_pages.map((page: string) => (
                    <Link key="1" href={page} target="_blank">
                      {page}
                    </Link>
                  ))}
                </TableCell>
                <TableCell>
                  {domains.map((page: string) => (
                    <div key="1">{page}</div>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return (
      <div className="main">
        <h1>University not found</h1>
        <h2>{id}</h2>
        <Button variant="outlined" href="/">
          Home Page
        </Button>
      </div>
    );
  }
}

export async function generateStaticParams() {
  const unis = getAllUniIds();

  return unis.map((uni) => {
    const uniId = createUniLink(uni.name);
    return {
      id: uniId,
    };
  });
}
