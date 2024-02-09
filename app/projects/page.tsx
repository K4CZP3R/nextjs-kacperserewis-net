import Button from "../../components/button/button";
import Card from "../../components/card/card";
import { getSiteName } from "../../lib/get-site-name";
import { ProjectRepository } from "../../repo/project.repository";
import styles from "../../styles/Projects.module.css";

export async function generateMetadata() {
  return {
    title: getSiteName("Projects"),
    description: "Here are some of my projects.",
  };
}

export default async function Projects() {
  const projects = await new ProjectRepository().getAll();

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
