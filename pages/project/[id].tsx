import { getCmsProject, getCmsProjects } from "../../lib/get-cms";
import { IProject } from "../../models/project.model";
import styles from "../../styles/Project.module.css";

export default function Index({ project }: { project: IProject | null }) {
  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div className={styles.content}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const projects = (await getCmsProjects()).data;

  let paths = projects.map((project) => {
    return {
      params: {
        id: project.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      project: await getCmsProject(params.id),
      id: params,
    },
  };
}
