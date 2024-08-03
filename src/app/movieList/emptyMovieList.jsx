import React from "react";
import ButtonComponent from "../components/button";
import { useRouter } from "next/navigation";

const EmptyMovieList = () => {
  const router = useRouter();
  return (
    <div className="d-flex justify-content-center align-items-center text-center flex-column ">
      <h4>Your movie list is empty</h4>
      <ButtonComponent
        title="Add a new movie"
        onPress={() => router.push("/movieList/createMovie")}
      />
    </div>
  );
};

export default EmptyMovieList;
