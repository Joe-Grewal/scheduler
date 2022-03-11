export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(appointment => appointment.name === day);
  if (!filteredDay || filteredDay.length === 0) {
    return [];
  } else {
    return filteredDay[0].appointments.map(id => state.appointments[id]);
  }
}