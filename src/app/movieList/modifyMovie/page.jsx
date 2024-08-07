"use client";

import ButtonComponent from "../../components/button";
import ImageInput from "../../components/imageInput";
import InputField from "../../components/inputField";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter, usePathname, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
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
  const serachParms = useSearchParams();
  const { t } = useTranslation();
  const id = serachParms.get("id");
  const params = useParams();
 // debugger;
  //const id = params.id;

  const { data: movieDataId, isLoading } = useGetMovieByIdQuery({ id });

  const { enqueueSnackbar } = useSnackbar();
  const [putMovies] = usePutMoviesMutation();
  const [postImageUrl] = usePostImageUrlMutation();
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageUpload = (url) => {
    const modifiedUrl = url.replace(/^https:/, "http:");
    setImageUrl(modifiedUrl);
  };

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (movieDataId) {
      setValue("title", movieDataId?.title);
      setValue("publishingYear", movieDataId?.publishing_year);
      setImageUrl(movieDataId?.poster);
      setImage(movieDataId?.poster);
      setValue("id", movieDataId?.id);
    }
  }, [movieDataId]);

  const onSubmit = async (data) => {
    console.log("data", data);
    let res;
    if (imageUrl !== image) {
      const formData = new FormData();
      formData.append("file", imageUrl);

      try {
        res = await postImageUrl(formData).unwrap();
      } catch (error) {
        enqueueSnackbar("Error Uploading Movie Poster", { variant: "error" });
      }
    }

    const title = data.title;
    const publishing_year = parseInt(data.publishingYear, 10);
    const poster = res?.url ? res?.url : imageUrl;

    try {
      const updatedMovie = {
        title,
        publishing_year,
        poster,
      };

      await putMovies({ id: data.id, payload: updatedMovie }).unwrap();
      enqueueSnackbar("Movie successfully Updated", { variant: "success" });
      router.push("/movieList");
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: "error" });
    }
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
          {imageUrl && (
            <ImageInput imageUrl={imageUrl} onImageUpload={handleImageUpload} />
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
