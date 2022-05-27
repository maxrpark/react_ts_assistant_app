import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../ts/interfaces';

const url = 'https://assitant-app.netlify.app/api/projects-api';

const Home = () => {
  const [projects, setProjects] = useState([]);

  const getItems = () => {
    axios.get(url).then((res) => {
      setProjects(res.data);
    });
  };
  useEffect(() => {
    getItems();
    console.log(projects);
  }, []);

  if (projects.length === 0) {
    return (
      <section className='section'>
        <h2 className='title'>Loading...</h2>;
      </section>
    );
  }
  return (
    <section className='section'>
      <h2 className='title'>Assistant</h2>
      <h3 className='title'>Same App with different frameworks or languages</h3>
      <div className='container'>
        {projects.map((project: Project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    </section>
  );
};

export default Home;
