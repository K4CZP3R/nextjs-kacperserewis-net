import Button from "../../components/button/button";
import Card from "../../components/card/card";
import { IProject } from "../../models/project.model";
import { ProjectRepository } from "../../repo/project.repository";
import styles from "../../styles/Projects.module.css";

export default function Projects({ projects }: { projects: IProject[] }) {
  return (
    <div className={styles.content}>
      <h1>Projects</h1>
      <p>Here are some of my projects.</p>

      <div className={styles.projects}>
        {projects.map((project) => (
          <Card
            key={project.slug}
            title={project.title}
            description={project.description}
            hashTags={project.tags}
          >
            <div className={styles.buttons}>
              {project.buttons.map((button) => {
                return (
                  <Button key={button.path} path={button.path}>
                    {button.title}
                  </Button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const projects = await new ProjectRepository().getAll();
  return {
    props: {
      projects: projects,
    },
  };
}
