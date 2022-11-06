import { getCmsProject, getCmsProjects } from "../../lib/get-cms";
import { IProject } from "../../models/project.model";

export default function Index({ project }: { project: IProject | undefined }) {
  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div>
      <h1>{JSON.stringify(project)}</h1>
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
      project: (await getCmsProject(params.id)).data,
      id: params,
    },
  };
}
