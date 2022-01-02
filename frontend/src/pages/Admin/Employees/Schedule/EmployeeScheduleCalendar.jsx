import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/react/";

const EmployeeScheduleCalendar = () => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            locale={"pt-br"}
            buttonText={{
                today: "Hoje",
                month: "Mês",
                week: "Semana",
                day: "Dia",
                list: "lista",
            }}
            initialView="dayGridMonth"
        />
    );
};

export default EmployeeScheduleCalendar;
