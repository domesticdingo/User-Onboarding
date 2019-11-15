import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, touched, status}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        status && setUser(user => [...user, status])
    }, [status])

    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Username" />
                {touched.name && errors.name && <p className="errors">{errors.name}</p>}
                <Field type="text" name="email" placeholder="E-mail" />
                {touched.email && errors.email && <p className="errors">{errors.email}</p>}
                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password && <p className="errors">{errors.password}</p>}
                <label className="checkbox-container">
                    Terms of Service
                    <Field type="checkbox" name="tos" checked={values.tos} />
                </label>
                <button type='submit'>Submit</button>
            </Form>
            {user.map(user => (
                <ul key={user.name}>
                    <li>Username: {user.name}</li>
                    <li>E-mail: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    )
}

const MakeForm = withFormik({
    mapPropsToValues({name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
    }),
    handleSubmit(values, {setStatus}) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(response => {
                setStatus(response.data);
                console.log(response);
            })
            .catch(error => console.log("There was an error: " + error));
    }
})(UserForm);
export default MakeForm;