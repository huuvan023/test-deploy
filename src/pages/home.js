import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import { CssBaseline } from '@material-ui/core';
import NavBar from '../components/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as constants from './../store/constants'
import User from '../components/user';
import Screams from '../components/screams';
import ListUser from '../components/listUser';
import Skeleton from '@material-ui/lab/Skeleton';
import { store } from './../store/store'
import { httpClient } from './../config/httpClient'
import PostStatus from '../components/post';


export default function Home() {
    const [loading,setLoading] = useState(true)
    let [uData,setUData] = useState({})
    const globalState = useContext(store)
    const { dispatch } = globalState;

    //const globalState = useContext(store)
    //console.log(globalState)
    //const { dispatch } = globalState;
    //dispatch({type:"aa"})

    const fetchData = React.useCallback(async () => {
        const screams = httpClient.get('/screams')
        screams
        .then(data => { 
            setUData(udata => data)
            setLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])    
      
    useEffect(()=>{
        dispatch({
            type: constants.SET_LOADING
        })
        fetchData();
        return () => true;
    },[])

    return (
        <Grid container >
            <CssBaseline/>
            <Grid item xs={12}>
                <NavBar/>
            </Grid>

            <Grid item sm={3} xs={12}>
                <User/>
            </Grid>
            <Grid item sm={6} xs={12}>
                { globalState.state.loading ? 
                (
                    <React.Fragment>
                        <PostStatus/>
                        { uData.length > 0 ? uData.map((item,index) => <Screams item={item} key ={ index }/> ) : ""}
                    </React.Fragment>
                    
                )
                :
                (
                    <Grid style={{marginTop: "15px"}}>
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                    </Grid>
                )
                 }
            </Grid>
            <Grid item sm={3} xs={12}>
                <ListUser/>
            </Grid>
        </Grid>
    ) 
}
