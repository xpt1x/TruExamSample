import Api from '../components/Api'

export default function FetchTasks({setTasks, enqueueSnackbar})
{
    //const { enqueueSnackbar } = useSnackbar();

    Api.get("/tasks").then(response => {
        if(!response.ok) {
            enqueueSnackbar('Problem fetching tasks', {variant: 'error'})
            console.log(response.problem)
        }
        else { 
            setTasks(response.data)
            enqueueSnackbar('Please submit these tasks', {variant: 'info'})
        }

    })
}