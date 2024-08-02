"use client";

import ButtonComponent from "../../components/button";
import ImageInput from "../../components/imageInput";
import InputField from "../../components/inputField";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import ProtectedRoute from "../../protected";

const ModifyMovie = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
    <Container className="my-5 position-relative z-3">
      <div>
        <h4 className="py-4 d-flex align-items-center gap-2 pe-auto">Edit</h4>
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
                    type="text"
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
              title="Update"
              onPress={handleSubmit(() => {})}
              btnContainerOverrideStyle="px-5"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProtectedRoute(ModifyMovie);
