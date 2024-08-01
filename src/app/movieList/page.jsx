"use client";
import React, { useState } from "react";
import EmptyMovieList from "./emptyMovieList";
import MovieCard from "./movieCard";
import { Col, Container, Row, Pagination, Spinner } from "react-bootstrap";
import { BoxArrowRight, PlusCircle } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import { useGetMoviesQuery } from "../../services/moviesApi";

const MovieList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const params = {
    pageNo: 1,
    pageSize: 10,
    fields: "id,title,publishing_year,poster",
    sortOrder: "id desc",
  };

  const { data: moviesData, error, isLoading } = useGetMoviesQuery(params);

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

  if (error) {
    console.error("Error fetching movies:", error);
    return <div>Error loading movies. Please try again later.</div>;
  }

  const totalMovies = moviesData?.count || 0;
  const indexOfLastMovie = currentPage * params.pageSize;
  const indexOfFirstMovie = indexOfLastMovie - params.pageSize;
  const totalPages = Math.ceil(totalMovies / params.pageSize);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5 position-relative z-3">
      <div className="d-flex justify-content-between">
        <div>
          <h4 className="py-4 d-flex align-items-center gap-2 pe-auto">
            My movies{" "}
            <PlusCircle
              color="#fff"
              className="fs-6 pe-auto"
              onClick={() => router.push("/movieList/modifyMovie")}
            />
          </h4>
        </div>
        <div>
          <h6 className="py-4 d-flex align-items-center gap-2">
            Log Out{" "}
            <BoxArrowRight
              color="#fff"
              className="fs-6"
              onClick={() => router.push("/")}
            />
          </h6>
        </div>
      </div>
      {totalMovies > 0 ? (
        <>
          <Row>
            {moviesData.rows
              .slice(indexOfFirstMovie, indexOfLastMovie)
              .map((movie, index) => (
                <Col key={movie.id || index} lg={3} md={6} sm={12} xs={12}>
                  <MovieCard
                    title={movie.title}
                    year={movie.publishing_year}
                    imageSrc={
                      "https://static.wikia.nocookie.net/jamescameronsavatar/images/1/15/Avatar_poster.jpg/revision/latest/scale-to-width/360?cb=20100103203426"
                    }
                  />
                </Col>
              ))}
          </Row>
          <div className="pagination-wrapper bg-movies-primary">
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                as="span"
                className="nav-button"
              >
                <span>Prev</span>
              </Pagination.Prev>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                as="span"
                className="nav-button"
              >
                <span>Next</span>
              </Pagination.Next>
            </Pagination>
          </div>
        </>
      ) : (
        <EmptyMovieList />
      )}
    </Container>
  );
};

export default MovieList;
