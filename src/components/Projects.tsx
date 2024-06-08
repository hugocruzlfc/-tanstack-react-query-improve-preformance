import React, { useState } from "react";
import { useProjects } from "../api/queries";

export const Projects: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, isPlaceholderData, isFetching } =
    useProjects(page);

  console.log(data);

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {isError && <div>There is an error!</div>}
      {isPlaceholderData && <div>Loading...</div>}
      {data?.data.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
        </div>
      ))}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next
      </button>
      {isFetching && <div>Loading...</div>}
    </div>
  );
};
