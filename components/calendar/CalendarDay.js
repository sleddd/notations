import Link from "next/link";
export const CalendarDay = (props) => {
    const today = new Date().toLocaleDateString("en-US");
    const classes =
      today == props.month + "/" + props.day + "/" + props.year
        ? "current-day"
        : "";
    return (
      <td className={classes}>
        <span>
          <Link 
            href={`/calendar/${props.year}/${props.month}/${props.day}`}>{props.day > 0 ? props.day : ""}
          </Link>
          </span>
      </td>
    );
};