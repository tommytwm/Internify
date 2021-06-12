import { Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

/*  Material UI Chips
*   - To add an icon, pass in the `icon` attribute with the Material UI Icon component
*   - To add the deletable icon, pass in the `onDelete` attribute with the function call
*/

export const ChipBasic = withStyles(() => ({
    root: {
      backgroundColor: "#043A74",
      color: "#FFFFFF",
      fontWeight: "bold",
    }
}))(Chip);

export const ChipClickable = withStyles(() => ({
    root: {
        backgroundColor: "#E61A4D",
        color: "#FFFFFF",
        fontWeight: "bold",
        "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        },
    }
}))(Chip);