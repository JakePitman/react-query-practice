"use client";
import { useQuery, useMutation } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

const wait = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const Posts = () => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => {
    //   console.log("TRYING");
    //   return Promise.reject(new Error("Failed"));
    // },
  });

  if (postQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (postQuery.isError) {
    return <div>{postQuery.error.message}</div>;
  }

  if (postQuery.isSuccess)
    return (
      <div>
        {postQuery.data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    );
};
