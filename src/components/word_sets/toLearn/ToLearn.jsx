import React from 'react';
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";

const mapState = (state) => ({
  words: state.firestore.ordered['users/gCT9Vywm4NbtbzLN9kqD/to_learn']
})

const ToLearn = ({words}) => {
  console.log(words)
  return (
    <div>
      {words && words.map(word => (
          <div key={word.id}>
            <h2>{word.title}</h2>
            <ol>
              {word.means.map(mean => (
                <li key={mean}>{mean}</li>
              ))}
            </ol>
          </div>
        )
      )}
    </div>
  );
};

export default connect(mapState)(firestoreConnect([{collection: 'users/gCT9Vywm4NbtbzLN9kqD/to_learn'}])(ToLearn));
