import express from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { login_schema } from '../middleware/validation.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const loginData = req.body;
    try {
        const { error } = login_schema.validate(loginData);
        if (error) return res.status(400).send({ error : `Error: ${error.details[0].message}`});

        const user = await fetch('http://localhost:8080/users')
        .then(res => res.json())
        .then(data => {
            return data.find(user => user.username === String([loginData.username]));
        });
        
        if (!user) return res.status(400).send({ error : `Wrong username.`});

        const match = await bcrypt.compare(loginData.password, user.password);
        if (match) {
            const token = jwt.sign({
                id : user.id,
                username : user.username,
                email : user.email
            }, process.env.SECRET_TOKEN, {expiresIn : '30s'});
            // console.log(token);
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200) // negauna react'e status'o - why ???
            .send({
                msg : `${loginData.username} successfully logged in!`,
                token : token
            });
            // .send({msg : `${loginData.username} successfully logged in!`, token : token});
        } else {
            res.status(400).send({error : "Wrong password."});
        } 
    } catch (error) {
        res.status(400).send(`${error}`);
    }
});

export default router;