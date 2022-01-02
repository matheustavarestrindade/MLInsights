import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { pt } from "react-date-range/dist/locale/index.js";
import { useState } from "react";

const useDateRangePicker = () => {
    const [range, setRange] = useState([
        {
            startDate: new Date(`01/01/${new Date().getFullYear()}`),
            endDate: new Date(`01/01/${new Date().getFullYear() + 1}`),
            key: "selection",
        },
    ]);
    return [<DateRange editableDateInputs={true}  locale={pt} onChange={(item) => setRange([item.selection])} moveRangeOnFirstSelection={false} ranges={range} />, range];
};

export default useDateRangePicker;
