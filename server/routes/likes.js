import express from 'express';
import fetch from 'node-fetch';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:id', verifyToken, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const likeData = req.body;
        let updatedLikesDislikes;
        console.log('answerId: ', id, 'likedata:', likeData);

        const fetchedAnswer = await fetch(`http://localhost:8080/answers/${id}`)
        .then(data => data.json());

        if (likeData.likeType === 'like') {
            const likes = fetchedAnswer.likes;
            const userAlreadyLiked = likes.find(userID => userID === likeData.userID);
            let updatedLikes;
            console.log('likes masyvas', likes);
            console.log('user already liked?', userAlreadyLiked);

            if (userAlreadyLiked) {
                updatedLikes = likes.filter(user => user !== likeData.userID);
            } else {
                likes.push(likeData.userID);
                updatedLikes = likes;
            }
            console.log('Updated likes', updatedLikes);
            updatedLikesDislikes = { likes : updatedLikes };

        } else if (likeData.likeType === 'dislike') {
            const disLikes = fetchedAnswer.dislikes;
            const userAlreadyDisliked = disLikes.find(userID => userID === likeData.userID);
            let updatedDislikes;

            if (userAlreadyDisliked) {
                updatedDislikes = disLikes.filter(user => user !== likeData.userID);
            } else {
                disLikes.push(likeData.userID);
                updatedDislikes = disLikes;
            }
            console.log('Updated likes', updatedDislikes);
            updatedLikesDislikes = { dislikes : updatedDislikes };
        }

        await fetch(`http://localhost:8080/answers/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedLikesDislikes)
        });
        res.status(200).send({ msg: `Like/dislike added!` });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(400).send('Something went wrong.');
    }
});

export default router;