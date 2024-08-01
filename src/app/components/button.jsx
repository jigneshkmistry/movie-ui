import PropTypes from "prop-types";
import classNames from "classnames";

const ButtonComponent = ({
  type,
  title,
  isLoading,
  isDisabled,
  onPress,
  isModalBtn,
  btnContainerOverrideStyle,
  buttonRowType,
}) => {
  return (
    <button
      {...(isModalBtn && {
        "data-bs-toggle": "modal",
        "data-bs-target": "#exampleModal",
      })}
      type={type || "button"}
      disabled={isDisabled || isLoading}
      onClick={onPress}
      className={`btn bg-movies-primary-success py-2 ${
        btnContainerOverrideStyle || "border-0"
      }`}
    >
      {isLoading && (
        <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      )}
      <span className={classNames({ invisible: isLoading })}>{title}</span>
    </button>
  );
};

export default ButtonComponent;

ButtonComponent.propTypes = {
  type: PropTypes.any,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
  isModalBtn: PropTypes.bool,
  btnContainerOverrideStyle: PropTypes.string,
  buttonRowType: PropTypes.bool,
};
