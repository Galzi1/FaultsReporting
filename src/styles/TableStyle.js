import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme) => ({
    head: {
        fontSize: "1.1rem", 
        fontWeight: "bold", 
        padding: 8,  
        color: theme.palette.common.white
    },
    body: {
        fontSize: "1.1rem", 
        padding: 8
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

export const TableWrapperStyle = {
    paddingBottom: "2%", 
    paddingTop: "2%", 
    paddingLeft: "2%", 
    paddingRight: "2%"
};