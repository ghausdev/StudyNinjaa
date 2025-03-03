import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { helpers } from "../../utils/helpers";
import AuthService from "../../services/AuthService";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/auth.png";
const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "tutor", // student or tutor
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength += Object.values(checks).filter(Boolean).length;

    return {
      score: strength,
      checks,
      feedback:
        strength === 0
          ? "Very Weak"
          : strength <= 2
          ? "Weak"
          : strength <= 4
          ? "Medium"
          : "Strong",
    };
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${helpers.capitalizeWords(
          field.replace(/([A-Z])/g, " $1")
        )} is required`;
      }
    });

    if (!helpers.isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    // Add password strength validation
    const passwordStrength = checkPasswordStrength(formData.password);
    if (!passwordStrength.checks.length) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (!passwordStrength.checks.hasUpper) {
      newErrors.password =
        (newErrors.password || "") +
        "\nMust contain at least one uppercase letter";
    }
    if (!passwordStrength.checks.hasLower) {
      newErrors.password =
        (newErrors.password || "") +
        "\nMust contain at least one lowercase letter";
    }
    if (!passwordStrength.checks.hasNumber) {
      newErrors.password =
        (newErrors.password || "") + "\nMust contain at least one number";
    }
    if (!passwordStrength.checks.hasSpecial) {
      newErrors.password =
        (newErrors.password || "") +
        "\nMust contain at least one special character";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthService.register(formData);

      // If registration is successful, redirect to email verification
      navigate("/verify-email", {
        state: {
          email: formData.email,
          isTutor: formData.role === "tutor",
        },
      });
    } catch (error) {
      setErrors({ submit: error.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Add Logo */}
     <div className="text-center">
          <Link to="/" className="inline-block">
            <img src={logo} alt="StudyNINJAA" className="" />
          </Link>
        </div>

      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-red-600 hover:text-red-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              I am a
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {["student", "tutor"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role }))}
                  className={`border rounded-lg p-4 flex flex-col items-center justify-center text-sm ${
                    formData.role === role
                      ? "border-red-500 ring-2 ring-red-200 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <span className="capitalize font-medium">{role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.firstName ? "border-red-300" : "border-gray-300"
                } focus:border-red-500 focus:ring-red-500`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.lastName ? "border-red-300" : "border-gray-300"
                } focus:border-red-500 focus:ring-red-500`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.email ? "border-red-300" : "border-gray-300"
              } focus:border-red-500 focus:ring-red-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.phone ? "border-red-300" : "border-gray-300"
              } focus:border-red-500 focus:ring-red-500`}
              placeholder="+1234567890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Password Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } focus:border-red-500 focus:ring-red-500`}
              />
              {formData.password && (
                <div className="mt-1">
                  <div className="text-sm">
                    Password Strength:{" "}
                    <span
                      className={`font-medium ${
                        checkPasswordStrength(formData.password).feedback ===
                        "Strong"
                          ? "text-green-600"
                          : checkPasswordStrength(formData.password)
                              .feedback === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {checkPasswordStrength(formData.password).feedback}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Password must contain:
                    <ul className="list-disc list-inside">
                      <li
                        className={
                          checkPasswordStrength(formData.password).checks.length
                            ? "text-green-600"
                            : ""
                        }
                      >
                        At least 8 characters
                      </li>
                      <li
                        className={
                          checkPasswordStrength(formData.password).checks
                            .hasUpper
                            ? "text-green-600"
                            : ""
                        }
                      >
                        One uppercase letter
                      </li>
                      <li
                        className={
                          checkPasswordStrength(formData.password).checks
                            .hasLower
                            ? "text-green-600"
                            : ""
                        }
                      >
                        One lowercase letter
                      </li>
                      <li
                        className={
                          checkPasswordStrength(formData.password).checks
                            .hasNumber
                            ? "text-green-600"
                            : ""
                        }
                      >
                        One number
                      </li>
                      <li
                        className={
                          checkPasswordStrength(formData.password).checks
                            .hasSpecial
                            ? "text-green-600"
                            : ""
                        }
                      >
                        One special character
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 whitespace-pre-line">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } focus:border-red-500 focus:ring-red-500`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <input
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <Link to="/terms" className="text-red-600 hover:text-red-500">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-red-600 hover:text-red-500">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
