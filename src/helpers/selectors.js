export function getAppointmentsForDay(state, day) {
const dayFound = state.days.find(stateday => day === stateday.name);
if(!dayFound){
  return [];
}
const appointmentsFound= dayFound.appointments.map(appointment => {
  return state.appointments[appointment];
});
return appointmentsFound;
}