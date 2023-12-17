import MonacoEditor  from "@/app/ui/dashboard/monaco-editor";

export default async function Page() {

  const da1 = await fetch('http://localhost:4000/api/questionTitle')
  .then((res) => res.json())
  .catch((err) => {
   console.log(err);
    throw err
  })

  const da2 = await fetch('http://localhost:4000/api/questionStats')
  .then((res) => res.json())
  .catch((err) => {
   console.log(err);
    throw err
  })

  const da = await fetch('http://localhost:4000/api/questionContent')
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    throw err
  })
  console.log(da);

  const stats = JSON.parse(da2.question.stats);

  return <div>
    <div>{da1.question.title}</div>
    <div dangerouslySetInnerHTML={{ __html: da.question.content }} />
    <div>{stats.totalAccepted }</div>
    <MonacoEditor/>
  </div>
    //return <p>{da.question.content}</p>;
}