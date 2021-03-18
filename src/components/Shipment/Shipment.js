import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => console.log(data);

    console.log(watch("example"));
    return (
        < form className="App, App-header" onSubmit={handleSubmit(onSubmit)} >
            <h1>Enter Your Shipment Address</h1>
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter your name" required/>
            { errors.name && <span className="error">Name field is required</span>} <br/>
            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter your email" required/>
            { errors.email && <span className="error">Email field is required</span>} <br/>
            < input name="phone" ref={register({ required: true })} placeholder="Enter your phone" required/>
            { errors.phone && <span className="error">Phone field is required</span>} <br/>
            < input name="address" ref={register({ required: true })} placeholder="Enter your address" required/>
            { errors.address && <span className="error">Address field is required</span>}
            <br/>
            <input type="submit" />
        </form >
    );
};

export default Shipment;