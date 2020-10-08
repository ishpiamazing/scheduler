import React, { useState, useEffect } from "react";

import axios from "axios";

export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
      Promise.all([
        axios.get(`/api/days`),
        axios.get(`/api/appointments`),
        axios.get(`/api/interviewers`)
      ]).then(all => {
        setState(prev =>({...prev, days: all[0].data, appointments : all[1].data, interviewers : all[2].data}))
      }).catch(err => console.log(err.message));
    },[]);

    const setDay = day => setState({ ...state, day });

    function bookInterview(id, interview) {
      
      const days= [...state.days];
      const day = days.find((d)  => d.name === state.day)
      if(!state.appointments[id].interview) {
        day.spots--;
      }
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      
      return axios.put(`api/appointments/${id}`,appointment).then(() => {
      setState({...state, appointments,days})
      })
    }

    function cancelInterview(id) {
      const days= [...state.days];
      const day = days.find((d)  => d.name === state.day)
      if(state.appointments[id].interview) {
        day.spots++;
      }
      const appointment = {
        ...state.appointments[id]
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.delete(`api/appointments/${id}`)
      .then(res => {
        setState({...state,appointments,days})
      })
    }

    return { state, setDay, bookInterview, cancelInterview };
}



