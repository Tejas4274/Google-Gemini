import React, { useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";

const App = () => {

  useEffect(()=>{
    document.title="Developed By Tejas"
  },[]);

  return (
    <>
      <Sidebar></Sidebar>
      <Main></Main>
    </>
  );
};

export default App;
