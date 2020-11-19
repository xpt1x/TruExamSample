import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { blue, deepOrange } from "@material-ui/core/colors";
import { useSnackbar } from 'notistack';
import {Router} from '@reach/router'
import Landing from './components/Landing'
import Tasks from './components/Tasks'
import CreateTask from './components/CreateTask'
import Review from './components/Review'
import ReviewTask from "./components/ReviewTask";
import { useState } from "react";
import SubmitTask from "./components/SubmitTask";


function App() 
{
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: blue,
      secondary: deepOrange,
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const [tasks, setTasks] = useState(undefined)
  const [subs, setSubs] = useState(undefined)
  const [selection, setSelection] = useState(undefined)
  const glProps = {
    selection,
    tasks,
    subs,
    setSelection,
    setSubs,
    setTasks,
    enqueueSnackbar
  }

  return (
    <>
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Landing path="/" default />
          <CreateTask path="create" {...glProps}/>
          <Tasks path="tasks" {...glProps} />
          <Review path="view" {...glProps} />
          <ReviewTask path="review/:taskid" {...glProps} />
          <SubmitTask path="submit/:taskid" {...glProps} />
        </Router>
      </MuiThemeProvider>
    </>
  )
}

export default App;