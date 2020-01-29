import React, { Fragment } from 'react';
import {TextField,Button,Typography,Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import faker from 'faker/locale/en'


const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    }
  }));

const onSubmit = async (data)=>{
    document.getElementById('form_submission').innerText = 'Submitting'

    let form_data = new FormData();
    form_data.append('image', data.image[0]);
    form_data.append('name',data.name)
    form_data.append('age',data.age)
    form_data.append('email',data.email)
    form_data.append('number',data.number)
    form_data.append('rescueCentre',data.rescueCentre)

    try{
        const response = await axios.post('/form', form_data)
        if(response.data.url){
            document.getElementById('profile_pic').src = response.data.url    
        }
            document.getElementById('form_submission').innerText = 'Successfully Submitted'
    }catch(err){
        document.getElementById('form_submission').innerText = 'UnSuccessfully Submitted' + err
    }

        // const fakeData = async(i)=>{
        //     var data = {
        //         image : `${faker.image.people(200,200)}?random=${i}`,
        //         name : faker.name.findName(),
        //         email : faker.internet.email(),
        //         number : faker.phone.phoneNumber('##########'),
        //         rescueCentre : faker.lorem.word(),
        //         age : 20
        //     }
        //     await axios.post('/form',data)

        // }

        // for(let i=0;i<20;i++){
        //     await fakeData(i)
        // }
}

const FormComponent = () => {
    const classes = useStyles();
    const { register, handleSubmit,  errors } = useForm()

    return (
        <Fragment>
            <Typography variant="h5" style={{padding:'1rem 0',background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))',color : 'white'}}>
                Submit Details Of Safe Person
            </Typography>
            <Divider style={{marginTop:'1rem'}}/>
            <img src="https://bp-gc.in/0Lo9V8" id="profile_pic" style={{marginTop:'1rem', width:'250px',height : '230px',objectFit: 'cover'}}/>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div>

                <Button variant="contained" color="primary" component="label" style={{marginTop : '1rem'}} >
                Upload Your Pic
                <input type="file" style={{ display: "none" }} ref={register} name="image" />
                </Button>

                <TextField required id="1" label="Name" autoComplete="name" name="name" inputRef={register} />

                <TextField required id="2" label="Age"  name="age" type="number" inputRef={register({min: 0,max:150})} />
                {errors.age && "Invalid Age"}

                <TextField id="5" label="Email"  name="email" type="email" inputRef={register} />

                <TextField id="3" label="Phone Number" name="number" type="number" inputRef={register({minLength:10,maxLength:15})} />
                {errors.age && "Invalid Phone Number"}

                <TextField id="4" label="Rescue Centre" name="rescueCentre" inputRef={register} />

                <Button variant="contained" color="primary" style={{marginTop : '1rem'}} type="submit"> 
                    Submit Response
                </Button>
                <Typography variant="h6" color="error" >
                    <div id="form_submission"> </div> 
                </Typography>
                </div>
            </form>
        </Fragment>
    );
}

export default FormComponent;
