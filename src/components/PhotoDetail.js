import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PhotoDetail.css'

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  
  return formattedDate;
}


const PhotoDetail = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const fetchPhotoDetail = async () => {
      try {
        const photoResponse = await axios.get(`http://localhost:5000/api/photos/${photoId}`);
        setPhoto(photoResponse.data);
  
        // Fetch comments for the photo
        const commentsResponse = await axios.get(`http://localhost:5000/api/photos/${photoId}/comments`);
        console.log(commentsResponse)

        const commentsWithUser = await Promise.all(commentsResponse.data.map(async comment => {
          // Fetch user info for each comment
          const userResponse = await axios.get(`http://localhost:5000/api/users/${comment.user}`);
          const user = userResponse.data;
          return { ...comment, user };
        }));
        setComments(commentsWithUser);
        console.log(commentsWithUser)

      } catch (error) {
        console.error('Error fetching photo detail:', error);
      }
    };

    fetchPhotoDetail();
  }, [photoId]);

  const handleCommentSubmit = async () => {
    try {
      // Send request to create new comment
     const commentsResponse =  await axios.post(`http://localhost:5000/api/photos/${photoId}/comments`, {
        text: newCommentText,
        user_id: localStorage.getItem("userID")
      });



        // Fetch user info for each comment
        const userResponse = await axios.get(`http://localhost:5000/api/users/${localStorage.getItem("userID")}`);
        const user = userResponse.data;
      setComments(prevComments => [...prevComments,{ ...commentsResponse.data, user } ]);

      // Clear input field
      setNewCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className='photo-detail-container'>
      {photo && (
        <div>
          <h2>Photo Detail</h2>
          <img src={photo.file_name} />
          {/* Display other details of the photo if needed */}

          <h3>Comments</h3>
          <div className='comment-form'>
            <input
              type="text"
              value={newCommentText}
              onChange={e => setNewCommentText(e.target.value)}
              placeholder="Enter your comment"
              autofocus="false"
            />
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
          <ul className='comments-list'>
            {comments.map(comment => (
              <li key={comment._id}>
                <div className='comment'>
                <p>{comment.user.first_name} {comment.user.last_name}</p>
                <p>{comment.text}</p>                     
                </div>
             
                <p style={{fontSize:"13px", marginLeft:"20px"}}>{formatDateTime(comment.date_time)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PhotoDetail
