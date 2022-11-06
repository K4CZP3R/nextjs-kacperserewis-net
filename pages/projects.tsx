import Card from "../components/card/card";
import { getCmsProjects } from "../lib/get-cms";
import { IProject } from "../models/project.model";
import styles from "../styles/Projects.module.css";

export default function Projects({ projects }: { projects: IProject[] }) {
  return (
    <div className={styles.content}>
      <h1>Projects</h1>
      <p>Here are some of my projects.</p>

      <div className={styles.projects}>
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            description={project.description}
            link={`/project/${project.id}`}
            linkText="View Project"
          ></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      projects: (await getCmsProjects()).data,
    },
  };
}
