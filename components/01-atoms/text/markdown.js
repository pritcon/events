import ReactMarkdown from "react-markdown";

export default function Markdown({
  value
}) {
  return (
    <>
     <ReactMarkdown source={value} />
    </>
  )
}
