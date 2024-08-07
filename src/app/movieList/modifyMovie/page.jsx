"use client";
import ButtonComponent from "../../components/button";
import ImageInput from "../../components/imageInput";
import InputField from "../../components/inputField";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import ProtectedRoute from "../../protected";
import { useSnackbar } from "notistack";
import { usePostImageUrlMutation } from "../../../services/imageUploadApi";
import { usePutMoviesMutation } from "../../../services/moviesApi";
import { useGetMovieByIdQuery } from "../../../services/moviesApi";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const ModifyMovie = () => {
  const router = useRouter();
  const id = useSearchParams()?.get("id");
  const { t } = useTranslation();
  const { data: movieData, isLoading } = useGetMovieByIdQuery({ id });
  const { enqueueSnackbar } = useSnackbar();
  const [putMovies] = usePutMoviesMutation();
  const [postImageUrl] = usePostImageUrlMutation();
  const [fileData, setfileData] = useState(null);
  const poster = movieData?.poster;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (movieData) {
      setValue("title", movieData?.title);
      setValue("publishingYear", movieData?.publishing_year);
      setValue("id", movieData?.id);
    }
  }, [movieData]);

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  const handleImageUpload = (file_data) => {
    setfileData(file_data);
  };

  const onSubmit = async (data) => {
    let image_url = poster;
    if (fileData) {
      image_url = await uploadMoviePoster(fileData);
    }
    try {
      await putMovies({
        id: data.id,
        payload: {
          title: data.title,
          publishing_year: parseInt(data.publishingYear, 10),
          poster: image_url,
        },
      }).unwrap();
      enqueueSnackbar("Movie successfully Updated", { variant: "success" });
      router.push("/movieList");
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: "error" });
    }
  };

  const uploadMoviePoster = async (fileData) => {
    let poster_url = "";
    try {
      const formData = new FormData();
      formData.append("file", fileData);
      const res = await postImageUrl(formData).unwrap();
      poster_url = res.url;
    } catch (error) {
      enqueueSnackbar("Error Uploading Movie Poster", { variant: "error" });
      return poster_url;
    }
    return poster_url;
  };

  return (
    <Container className="my-5 position-relative z-3">
      <div>
        <h4 className="py-4 d-flex align-items-center gap-2 pe-auto">
          {t("Edit")}
        </h4>
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
                    placeholder={t("Title")}
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
                validate: {
                  isNumber: (value) => !isNaN(value) || "Year must be a number",
                  inRange: (value) =>
                    (value >= 1900 && value <= new Date().getFullYear()) ||
                    `Year must be between 1900 and ${new Date().getFullYear()}`,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputField
                    type="number"
                    name="publishingYear"
                    value={value || getValues("publishingYear")}
                    onChange={(value) => onChange(value)}
                    placeholder={t("Publishing year")}
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
          {poster && (
            <ImageInput imageUrl={poster} onImageUpload={handleImageUpload} />
          )}
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
                    placeholder={t("Title")}
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
                    placeholder={t("Publishing year")}
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
                title={t("Cancel")}
                onPress={() => router.push("/movieList")}
                btnContainerOverrideStyle="bg-movies-primary  bg-movie-button-border w-100"
              />
            </div>
            <div className="col-6 col-md-6 col-sm-8">
              <ButtonComponent
                title={t("Update")}
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
                title={t("Cancel")}
                onPress={() => router.push("/movieList")}
                btnContainerOverrideStyle="bg-movies-primary  bg-movie-button-border w-100"
              />
            </div>
            <div className="col-6 col-md-6 col-sm-8">
              <ButtonComponent
                title={t("Update")}
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
