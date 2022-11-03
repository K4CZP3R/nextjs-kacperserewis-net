import Test from "../components/test";

function Index({ name, another_one }: { name: string; another_one: string }) {
  return (
    <div>
      Hello {name} and {another_one}! <Test></Test>
    </div>
  );
}

export default Index;

export async function getStaticProps() {
  const res = await fetch("https://reqres.in/api/users/2");
  const resp = await res.json();
  // Delay 5s
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    props: {
      name: resp.data.first_name,
    },
  };
}
