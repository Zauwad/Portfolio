import { Helmet } from "react-helmet";
import Stack from "../Home/Stack";

export default function StackPage() {
  return (
    <>
      <Helmet>
        <title>Stack — Ridwanul.dev</title>
        <meta
          name="description"
          content="Technical Stack and Tools — Ridwanul Azim Zawad. Frontend, backend, database, and cloud infrastructure."
        />
      </Helmet>
      <Stack showTopBorder={false} />
    </>
  );
}
