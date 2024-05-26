import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://demotrainiq.com/case/dashboard')
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}><CircularProgress /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const activityHoursData = {
    labels: data.activity_hours.map(item => item.date),
    datasets: [
      {
        label: 'Hours',
        data: data.activity_hours.map(item => item.hours),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Exams Completed',
        data: data.activity_hours.map(item => item.exams_completed),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Lessons Taken',
        data: data.activity_hours.map(item => item.lessons_taken),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const skillsInDevelopmentData = {
    labels: data.skills_in_development.map(skill => skill.skill),
    datasets: [
      {
        data: data.skills_in_development.map(skill => skill.employees),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#FFCD56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#FFCD56'
        ]
      }
    ]
  };

  return (
    <div>


    <Container className='my-8'>
      
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Activity Hours</Typography>
            <Bar data={activityHoursData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Average Employee Score</Typography>
            <Typography variant="h2">{data.average_employee_score}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">In Progress Courses</Typography>
            <ul>
              {data.in_progress_courses.map((course, index) => (
                <li key={index}>{course.title} - {course.assigned_to}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Skills in Development</Typography>
            <Pie data={skillsInDevelopmentData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h4">Teams</Typography>
            {data.teams.map((team, index) => (
              <div key={index}>
                <Typography variant="h6" sx={{ marginY: '10px' }}>{team.title}</Typography>
                <Typography
      sx={{
        '::first-letter': {
          textTransform: 'uppercase',
        },
      }}
    >
      {team.description}
    </Typography>                <Typography>Overall Score: {team.overall_score}</Typography>
                <Typography>Total Employees: {team.total_employee_count}</Typography>
                <ul>
                  {team.employees.map((employee, index) => (
                    <li key={index}>{employee.name} - {employee.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" style={{ marginRight: 16 }}>Create New Team</Button>
          <Button variant="contained" color="secondary">Add New Employee to a Team</Button>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default Dashboard;
