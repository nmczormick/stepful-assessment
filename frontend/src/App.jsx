import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query' 
import Calendar from 'react-calendar'
import { baseUrl } from '../constants/global-variable.js'
import { Button, Table, Select, createListCollection } from "@chakra-ui/react"
const App = () => {
  async function fetchUserDetails(params) {
    const res = await fetch(baseUrl + "users");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  }

  async function fetchEvents(params) {
    const res = await fetch(baseUrl + "events");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserDetails,
  });

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  })

  if (isPending) {
    return "Loading";
  } 
  if (isError) {
    return error.message;
  }

  const [selectedUser, setSelectedUser] = useState(1);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingStudentEvents, setUpcomingStudentEvents] = useState([]);

  const userObject = data.filter(user => user.id == selectedUser);
  const allCoachEvents = eventsQuery.data.filter(event => event.coachname === userObject[0].name);
  const allStudentEvents = eventsQuery.data.filter(event => event.studentname === userObject[0].name)

  const fetchUpcomingEventsByCoach = () => {
    setUpcomingEvents(allCoachEvents.filter(event => event.studentname !== null && event.notes == null));
  }

  const fetchUpcomingEventsByStudent = () => {
    setUpcomingStudentEvents(allStudentEvents.filter(event => event.notes == null));
  }

  const fetchPastEventsByCoach = () => {
    setPastEvents(allCoachEvents.filter(event => event.notes !== null));
  }

  return (
    <div>
      <section>
        <p>Please select a user to get started</p>
        <select name="users" id="user-select" onChange={e=>{
          setSelectedUser(e.target.value)
          setPastEvents([]);
          setUpcomingEvents([]);
          setUpcomingStudentEvents([]);
        }}>
          {
            data.map(user => (
              <option value={user.id}>
                {user.name}
              </option>
            ))
          }
        </select>
        <br />
        <Button variant="solid" type="button" onClick={function() {
          if(userObject[0].coach) {
            fetchUpcomingEventsByCoach()
            fetchPastEventsByCoach()
          } else if (userObject[0].student) {
            fetchUpcomingEventsByStudent()
          }
        }}>Submit</Button>
      </section>
      <section>
        {
          data[selectedUser-1].coach && <>
            <h2>I am a Coach</h2>
            <section>
              <h2>Add Sessions to Your Calendar (Under construction)</h2>
              <Calendar />
            </section>
            <section>
              <h2>Upcoming Sessions</h2>
              {
              upcomingEvents.length > 0 && 
              <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader>Start Time</Table.ColumnHeader>
                  <Table.ColumnHeader>End Time</Table.ColumnHeader>
                  <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Student Phone</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {upcomingEvents.map((event) => (
                  <Table.Row key={event.id}>
                    <Table.Cell>{event.date.substring(0,10)}</Table.Cell>
                    <Table.Cell>{event.starttime.substring(0,5)}</Table.Cell>
                    <Table.Cell>{event.endtime.substring(0,5)}</Table.Cell>
                    <Table.Cell>{event.studentname}</Table.Cell>
                    <Table.Cell textAlign="end">{event.studentphone}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            }           
            </section>
            <section>
              <h2>Past Sessions</h2>
              {pastEvents.length > 0 && 
              <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Student Satisfaction</Table.ColumnHeader>
                  <Table.ColumnHeader>Notes</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pastEvents.map((event) => (
                  <Table.Row key={event.id}>
                    <Table.Cell>{event.date.substring(0,10)}</Table.Cell>
                    <Table.Cell>{event.studentname}</Table.Cell>
                    <Table.Cell>{event.studentsatisfaction}</Table.Cell>
                    <Table.Cell textAlign="end">{event.notes}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            }    
            </section>
          </>
        }
        {
          data[selectedUser-1].student && 
          <>
            <header>
              <h2>I am a Student</h2>
            </header>
            <section>
              <h2>Upcoming Events</h2>
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Start Time</Table.ColumnHeader>
                    <Table.ColumnHeader>End Time</Table.ColumnHeader>
                    <Table.ColumnHeader>Coach Name</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Coach Phone</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {upcomingStudentEvents.map((event) => (
                    <Table.Row key={event.id}>
                      <Table.Cell>{event.date.substring(0,10)}</Table.Cell>
                      <Table.Cell>{event.starttime.substring(0,5)}</Table.Cell>
                      <Table.Cell>{event.endtime.substring(0,5)}</Table.Cell>
                      <Table.Cell>{event.coachname}</Table.Cell>
                      <Table.Cell textAlign="end">{event.coachphone}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>     
            </section>
          </>
        }
      </section>
    </div>
  )
}

export default App