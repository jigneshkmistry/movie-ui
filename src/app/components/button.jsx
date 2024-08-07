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
      {isLoading ? (
        <div className=" d-flex justify-content-center align-items-center gap-2">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      ) : (
        <span className={classNames({})}>{title}</span>
      )}
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
