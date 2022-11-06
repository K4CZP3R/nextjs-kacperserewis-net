import Card from "../components/card/card";
import styles from "../styles/Projects.module.css";

export default function Projects({ projects }: { projects: any[] }) {
  return (
    <div className={styles.content}>
      <h1>Projects</h1>
      <p>Here are some of my projects.</p>

      <div className={styles.projects}>
        {projects.map((project) => (
          <Card
            key={project}
            title={project}
            description="This is a description of the project."
            link="#"
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
      projects: ["Test", "Test 2", "Test 3", "Test 4"],
    },
  };
}
