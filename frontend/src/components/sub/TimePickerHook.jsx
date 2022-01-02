import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Glass from "./glass/Glass";
import { useCallback, useEffect, useRef, useState } from "react";
import { TimepickerUI } from "timepicker-ui";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const useTimePicker = ({ icon = faCalendarCheck, time, label }) => {
    const [startTime, setStartTime] = useState(time);
    const timePickerRef = useRef();

    const handleStartTimeChange = useCallback((e) => {
        setStartTime(`${e.detail.hour}:${e.detail.minutes}`);
    }, []);

    useEffect(() => {
        const newPicker = new TimepickerUI(timePickerRef.current, {
            clockType: "24h",
            cancelLabel: "Cancelar",
            okLabel: "OK",
            hourMobileLabel: "Hora",
            minuteMobileLabel: "Minuto",
            selectTimeLabel: "Selecione um horário",
        });
        newPicker.create();

        timePickerRef.current.addEventListener("accept", handleStartTimeChange);

        return () => {
            if (timePickerRef.current) timePickerRef.current.removeEventListener("accept", handleStartTimeChange);
        };
    }, [handleStartTimeChange]);

    return [
        <div className="timepicker-ui" data-am-label="test" data-backdrop="false" data-ok-label="fine" ref={timePickerRef}>
            {label && (
                <label htmlFor="" className="form-label">
                    {label}
                </label>
            )}
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon={icon} />
                </span>
                <input type="test" className="timepicker-ui-input form-control" defaultValue={startTime} />
            </div>
        </div>,
        startTime,
    ];
};

export default useTimePicker;
