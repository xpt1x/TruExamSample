import Api from '../components/Api'

export default function FetchSubmissions({setSubs, enqueueSnackbar})
{
    //const { enqueueSnackbar } = useSnackbar();

    Api.get("/subs").then(response => {
        if(!response.ok) {
            enqueueSnackbar('Problem fetching submissions', {variant: 'error'})
            console.log(response.problem)
        }
        else { 
            setSubs(response.data)
            enqueueSnackbar('Please review these submissions', {variant: 'info'})
        }

    })
}