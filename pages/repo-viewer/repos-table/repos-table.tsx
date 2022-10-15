import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Repo } from "../repos-viewer.types";

type Props = {
  repos: Repo[];
};

export const ReposTable = ({ repos }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="repos table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">⭐ Stars</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">🍴 Forks</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map((repo) => {
            return (
              <TableRow key={repo.id}>
                <TableCell>
                  <Link href={repo.url}>{repo.name}</Link>
                </TableCell>
                <TableCell>⭐ {repo.stars}</TableCell>
                <TableCell>🍴 {repo.forks}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
