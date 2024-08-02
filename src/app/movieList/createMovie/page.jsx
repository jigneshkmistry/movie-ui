"use client";

import ButtonComponent from "../../components/button";
import ImageInput from "../../components/imageInput";
import InputField from "../../components/inputField";
import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePostMoviesMutation } from "../../../services/moviesApi";
import { useSnackbar } from "notistack";

const CreateMovie = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [postMovies] = usePostMoviesMutation();

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
    const title = data.title;
    const publishing_year = parseInt(data.publishingYear, 10);
    const poster =
      "https://cdn.vox-cdn.com/thumbor/TAzotU1RnNkUJ7RwFtu7Rn1Ntcw=/0x0:1688x2500/1200x0/filters:focal(0x0:1688x2500):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/11614195/InfinityWar5aabd55fed5fa.jpg";
    // "https://m.media-amazon.com/images/M/MV5BMjI5NTM5MDA2N15BMl5BanBnXkFtZTcwNjkwMzQxNw@@._V1_FMjpg_UX1000_.jpg";
    // imageUrl; right now using dummy url
    // "https://static.wikia.nocookie.net/jamescameronsavatar/images/1/15/Avatar_poster.jpg/revision/latest/scale-to-width/360?cb=20100103203426";

    try {
      const newMovie = {
        title,
        publishing_year,
        poster,
      };

      await postMovies({ payload: newMovie }).unwrap();
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
                title="Submit"
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
                title="Submit"
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

export default CreateMovie;
