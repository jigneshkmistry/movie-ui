"use client";

import ButtonComponent from "../../components/button";
import ImageInput from "../../components/imageInput";
import InputField from "../../components/inputField";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import ProtectedRoute from "../../protected";
import { useSnackbar } from "notistack";
import { usePostImageUrlMutation } from "../../../services/imageUploadApi";
import { usePutMoviesMutation } from "../../../services/moviesApi";
const ModifyMovie = ({ row }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [postImageUrl] = usePostImageUrlMutation();
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", imageUrl);
    let res;
    try {
      res = await postImageUrl(formData).unwrap();
    } catch (error) {
      enqueueSnackbar("Error Uploading Movie Poster", { variant: "error" });
    }
    const title = data.title;
    const publishing_year = parseInt(data.publishingYear, 10);
    const poster = res.url;

    try {
      const newMovie = {
        title,
        publishing_year,
        poster,
      };

      await postMovies({ payload: newMovie }).unwrap();
      enqueueSnackbar("Movie successfully Updated", { variant: "success" });
      router.push("/movieList");
    } catch (error) {
      enqueueSnackbar("Error Updating movie", { variant: "error" });
    }
  };

  return (
    <Container className="my-5 position-relative z-3">
      <div>
        <h4 className="py-4 d-flex align-items-center gap-2 pe-auto">Edit</h4>
      </div>
      <Row style={{ marginTop: "30px" }}>
        <Col lg={3} md={6} sm={12} xs={12} className="d-md-none d-block">
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
                    className="col-12 col-md-12 col-sm-8"
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
          <div className="w-100 mb-3">
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
                    className="col-12 col-md-10 col-sm-8"
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
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <ImageInput onImageUpload={handleImageUpload} />
        </Col>
        <Col lg={3} md={6} sm={12} xs={12} className="d-md-block d-none ">
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
                    className="col-12 col-md-12 col-sm-8"
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
                    className="col-12 col-md-10 col-sm-8"
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

          <Row className="d-flex flex-row mt-5 ">
            <div className=" col-6 col-md-6 col-sm-8">
              <ButtonComponent
                title="Cancel"
                onPress={() => router.push("/movieList")}
                btnContainerOverrideStyle="bg-movies-primary  bg-movie-button-border w-100"
              />
            </div>
            <div className="col-6 col-md-6 col-sm-8">
              <ButtonComponent
                title="Update"
                onPress={handleSubmit(onSubmit)}
                btnContainerOverrideStyle="w-100"
              />
            </div>
          </Row>
        </Col>
        <Col lg={3} md={6} sm={12} xs={12} className="d-md-none d-block">
          <Row className="d-flex flex-row mt-5 ">
            <div className=" col-6 col-md-6 col-sm-8">
              <ButtonComponent
                title="Cancel"
                onPress={() => router.push("/movieList")}
                btnContainerOverrideStyle="bg-movies-primary  bg-movie-button-border w-100"
              />
            </div>
            <div className="col-6 col-md-6 col-sm-8">
              <ButtonComponent
                title="Update"
                onPress={handleSubmit(onSubmit)}
                btnContainerOverrideStyle="w-100"
              />
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProtectedRoute(ModifyMovie);
