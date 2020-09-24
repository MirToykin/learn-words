import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import WordItem from "./WordItem";

const Set = ({set, pageTitle, options}) => {
  return (
    <>
      {set.map(word => (
        <ListItem key={word.id}>
          <WordItem word={word} pageTitle={pageTitle} options={options}/>
        </ListItem>
      ))}
    </>
  );
};

export default Set;