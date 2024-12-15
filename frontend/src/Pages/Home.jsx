
import Hero from "../components/Hero";

import Departments from "../components/Departments";
import Admit from "../components/admit";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Hospital Management System"
        }
        imageUrl={"/h1.png"}
      />
      <Admit/>
      
      <Departments />
    </>
  );
};

export default Home;
