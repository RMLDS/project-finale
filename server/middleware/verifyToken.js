import jwt from "jsonwebtoken";

export let verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send({ msg : 'Access denied!' });
    try {
        const data = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user_id = data.id;
        req.username = data.username;
        req.email = data.email;
        return next();
    } catch (error) {
        res.status(400).send({ msg : 'Please login'});
        // res.status(400).send({ msg : 'Invalid token', err : error });
    }
};