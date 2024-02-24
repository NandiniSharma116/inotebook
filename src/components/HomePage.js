import React, { useContext } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

const HomePage = (props) => {
  return (
    <>
    <div>
    <Notes changeAlert={props.changeAlert}/>
    </div>
    </>
  );
};

export default HomePage;
