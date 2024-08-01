"use client";

import ButtonComponent from "../../components/button";
import ImageInput from "../../components/imageInput";
import InputField from "../../components/inputField";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePostMoviesMutation } from "../../../services/moviesApi";
import { useSnackbar } from "notistack";

const CreateMovie = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [postMovies] = usePostMoviesMutation();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const title = data.title;
    const publishing_year = parseInt(data.publishingYear, 10);
    const poster =
      "https://en.wikipedia.org/wiki/The_Lost_City_of_Z_%28film%29#/media/File:The_Lost_City_of_Z_(film).png";

    try {
      const newMovie = {
        title,
        publishing_year,
        poster,
      };

      await postMovies(newMovie).unwrap();
      enqueueSnackbar("Movie successfully created", { variant: "success" });
      router.push("/movieList");
    } catch (error) {
      enqueueSnackbar("Error creating movie", { variant: "error" });
    }
  };

  return (
    <Container className="my-5 position-relative z-3">
      <div>
        <h4 className="py-4 d-flex align-items-center gap-2 pe-auto">
          Create a new movie
        </h4>
      </div>
      <Row style={{ marginTop: "30px" }}>
        <Col lg={6} md={6} sm={12} xs={12}>
          <ImageInput />
        </Col>
        <Col lg={3} md={6} sm={12} xs={12}>
          <div>
            <Controller
              control={control}
              name={"title"}
              defaultValue={""}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputField
                    type="text"
                    name="title"
                    value={value || getValues("title")}
                    onChange={(value) => onChange(value)}
                    placeholder="Title"
                    style={{
                      width: "323px",
                    }}
                  />
                </>
              )}
            />
            <ErrorMessage
              errors={errors}
              name={"title"}
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name={"publishingYear"}
              defaultValue={""}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputField
                    type="number"
                    name="publishingYear"
                    value={value || getValues("publishingYear")}
                    onChange={(value) => onChange(value)}
                    placeholder="Publishing year"
                    style={{
                      width: "200px",
                    }}
                  />
                </>
              )}
            />
            <ErrorMessage
              errors={errors}
              name={"publishingYear"}
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
          </div>

          <div className="d-flex flex-row gap-3 mt-5">
            <ButtonComponent
              title="Cancel"
              onPress={() => router.push("/movieList")}
              btnContainerOverrideStyle="bg-movies-primary  bg-movie-button-border px-5"
            />
            <ButtonComponent
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              btnContainerOverrideStyle="px-5"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMovie;
