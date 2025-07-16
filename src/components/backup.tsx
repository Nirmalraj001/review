import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const PRODUCTS = [
  "Snacks items",
  "Pepper mill powder",
  "Avarampoo drink powder",
  "Idly podi",
  "Multi mix Masala powder",
  "Paruppu powder",
  "Kasturi manjal for face",
  "Others"
];

import { Star } from "lucide-react";

export const StarRating = ({
  rating,
  setRating
}: {
  rating: number;
  setRating: (val: number) => void;
}) => {
  const descriptions = ["Very Bad", "Bad", "Average", "Good", "Excellent"];
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((val) => (
        <span key={val} onClick={() => setRating(val)}>
          <Star fill={val <= rating ? "#facc15" : "none"} />
        </span>
      ))}
      {rating > 0 && <div>{descriptions[rating - 1]}</div>}
    </div>
  );
};

export const sendToGoogleSheets = async (data: any) => {
  await fetch("https://sheetdb.io/api/v1/oc35cjb1zzk68", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};



const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    products: [] as string[],
    otherProduct: "",
    alreadyBought: "",
    deliveryMode: "",
    rating: 0,
    feedback: "",
  });

  const [errors, setErrors] = useState({} as any);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let newProducts = [...formData.products];
      if (checked) newProducts.push(value);
      else newProducts = newProducts.filter((p) => p !== value);
      setFormData({ ...formData, products: newProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const errs: any = {};
    if (!formData.name) errs.name = "Name is required.";
    if (!formData.mobile) errs.mobile = "Mobile number is required.";
    if (formData.products.length === 0) errs.products = "Select at least one product.";
    if (!formData.alreadyBought) errs.alreadyBought = "Select an option.";
    if (formData.alreadyBought === "Yes" && !formData.deliveryMode)
      errs.deliveryMode = "Select delivery mode.";
    if (formData.rating === 0) errs.rating = "Please provide a rating.";
    return errs;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    address: formData.address,
    products: formData.products.join(", "),
    alreadyBought: formData.alreadyBought,
    deliveryMode: formData.deliveryMode,
    rating: formData.rating,
    message: formData.feedback,
    email: "ntwohenterprises@gmail.com",
  };

    // Send Email
    await emailjs.send("service_u55vp4p", "template_xkiiyxc", templateParams, "8zapjqABRvc2P0VQP");

    // Google Sheets
    await sendToGoogleSheets(formData);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="thankyou-section">
        <h2>✅ Thank you for your feedback!</h2>
        <p>Would you like to leave a review on Google too?</p>
        <a
          className="google-review-btn"
          href="https://g.page/r/Cd-jFh5xVZzhEBM/review"
          target="_blank"
          rel="noopener noreferrer"
        >
          Leave a Google Review
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <header className="form-header">
        <h1>N2H ENTERPRISES</h1>
        <p>123, Market Street, Chennai - 600001</p>
      </header>

      {/* Personal Info */}
      <section className="form-section">
        <h2>Personal Information</h2>
        <input type="text" name="name" placeholder="Name *" onChange={handleChange} />
        {errors.name && <span>{errors.name}</span>}
        <input type="text" name="mobile" placeholder="Mobile Number *" onChange={handleChange} />
        {errors.mobile && <span>{errors.mobile}</span>}
        <input type="email" name="email" placeholder="Email ID" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
      </section>

      {/* Product Selection */}
      <section className="form-section">
        <h2>Products Purchased</h2>
        {PRODUCTS.map((prod) => (
          <label key={prod}>
            <input
              type="checkbox"
              name="products"
              value={prod}
              onChange={handleChange}
            />
            {prod}
          </label>
        ))}
        {formData.products.includes("Others") && (
          <input type="text" name="otherProduct" placeholder="Other Product Name" onChange={handleChange} />
        )}
        {errors.products && <span>{errors.products}</span>}
      </section>

      {/* Purchase Info */}
      <section className="form-section">
        <h2>Purchase Info</h2>
        <label>
          <input type="radio" name="alreadyBought" value="Yes" onChange={handleChange} />
          Yes
        </label>
        <label>
          <input type="radio" name="alreadyBought" value="No" onChange={handleChange} />
          No
        </label>
        {errors.alreadyBought && <span>{errors.alreadyBought}</span>}

        {formData.alreadyBought === "Yes" && (
          <>
            <label>
              <input type="radio" name="deliveryMode" value="Courier" onChange={handleChange} />
              Courier
            </label>
            <label>
              <input type="radio" name="deliveryMode" value="Hand delivery" onChange={handleChange} />
              Hand delivery
            </label>
            {errors.deliveryMode && <span>{errors.deliveryMode}</span>}
          </>
        )}
      </section>

      {/* Rating and Feedback */}
      <section className="form-section">
        <h2>Rating</h2>
        <StarRating
          rating={formData.rating}
          setRating={(val) => setFormData({ ...formData, rating: val })}
        />
        {errors.rating && <span>{errors.rating}</span>}

        <textarea
          name="feedback"
          placeholder="Kindly share your feedback"
          onChange={handleChange}
        />
      </section>

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
