import { useEffect, useRef, useState } from 'react';
import Home from '../components/home';
import Projects from '../components/projects';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setProjects } from '../../store/projectsReducer';
import AboutMe from '../components/aboutMe';
import { ProjectsType } from 'types';
import { GetStaticProps } from 'next';
import Layout from 'components/layout';

export const config = {
  unstable_runtimeJS: false,
};

export default function App({ projects }: { projects: ProjectsType[] }) {
  const { rotate } = useAppSelector((state) => state.rotate);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('Alejandro Sandí | Web Developer');

  useEffect(() => {
    dispatch(setProjects(projects));
  }, [projects, dispatch]);

  useEffect(() => {
    setTitle(rotate.current);
    if (rotate.current === 'home') {
      return setTitle('Alejandro Sandí | Web Developer');
    }
    if (rotate.current === 'projects') {
      return setTitle('Alejandro Sandí | Projects');
    }
    if (rotate.current === 'aboutMe') {
      return setTitle('Alejandro Sandí | About Me');
    }
  }, [rotate]);

  return (
    <Layout
      title={title}
      home={<Home />}
      projects={<Projects />}
      aboutMe={<AboutMe />}
    ></Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === 'development') {
    const res: Response = await fetch('http://localhost:3000/api/projects');
    const data: ProjectsType[] = await res.json();
    return {
      props: {
        projects: data,
      },
    };
  }

  const res: Response = await fetch('https://alejandrosandi.com/api/projects');
  const data: ProjectsType[] = await res.json();

  return {
    props: {
      projects: data,
    },
  };
};
