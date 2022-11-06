export default function Index({ postTitle }: { postTitle: string }) {
  return (
    <div>
      <h1>{postTitle}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      postTitle: params.id,
    },
  };
}
