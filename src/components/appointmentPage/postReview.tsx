import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PostReview = ({ visits }: any) => {
  const [rating, setRating] = useState(0); // امتیاز از 1 تا 5
  const [comment, setComment] = useState(""); // متن نظر
  const [canReview, setCanReview] = useState(false); // وضعیت دسترسی به ارسال نظر
  const { id } = useParams<string>();

  // بررسی نوبت‌ها که آیا نوبت بسته وجود دارد یا خیر
  const checkIfCanReview = () => {
    // بررسی نوبت‌ها
    const hasClosedVisit = visits.some((visit: any) => visit.closed === true);
    setCanReview(hasClosedVisit);
    console.log(hasClosedVisit)
  };

  // تغییرات در ورودی متن نظر
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // تغییرات در انتخاب امتیاز
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // ارسال نظر
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("لطفاً امتیاز و نظر خود را وارد کنید.");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/v1/reviews/patient",
        {
          comment,
          rating,
          id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        alert("نظر شما با موفقیت ارسال شد!");
      } else {
        alert("ارسال نظر موفقیت‌آمیز نبود.");
      }
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
      alert("مشکل پیش آمد");
    }
  };

  // بررسی وضعیت نوبت‌ها هنگام بارگذاری کامپوننت
  React.useEffect(() => {
    checkIfCanReview();
  }, [visits]);

  return (
    <div className="w-[80%] mx-auto p-6 md:px-24 bg-white rounded-xl shadow-md mt-5">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        نظر خود را وارد کنید
      </h2>

      {/* بررسی اینکه آیا کاربر می‌تواند نظر دهد یا خیر */}
      {!canReview && (
        <div className="text-red-500 text-center mb-4">
          برای ارسال نظر باید نوبت بسته شده داشته باشید.
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">امتیاز به دکتر (1 تا 5):</label>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`text-xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              disabled={!canReview} // غیرفعال کردن دکمه‌ها اگر اجازه نظر دادن نباشد
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">نظر شما:</label>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-2xl"
          placeholder="نظر خود را وارد کنید..."
          rows={4}
          required
          disabled={!canReview} // غیرفعال کردن فیلد نظر دادن اگر اجازه نداشته باشد
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleFormSubmit}
          className="w-[150px] bg-blue-500 text-white p-3 rounded-4xl hover:bg-blue-600"
          disabled={!canReview} // غیرفعال کردن دکمه ارسال نظر اگر اجازه نداشته باشد
        >
          ارسال نظر
        </button>
      </div>
    </div>
  );
};

export default PostReview;
