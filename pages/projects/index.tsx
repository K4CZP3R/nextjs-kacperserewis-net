import Card from "../../components/card/card";
import { IProject } from "../../models/project.model";
import { ProjectQlRepository } from "../../repo/project-ql.repository";
import styles from "../../styles/Projects.module.css";

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
            link={`/projects/${project.slug}`}
            linkText="View Project"
          ></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const proj = new ProjectQlRepository();
  const projects = await proj.getAll();
  return {
    props: {
      projects: projects,
    },
  };
}
