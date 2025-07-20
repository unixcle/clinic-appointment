// components/Reviews.tsx
import axios from "axios";
import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number; // از ۱ تا ۵
  comment: string;
  date: string; // ISO format
};

type ReviewsProps = {
  doctorId: string;
};

export default function Reviews({ doctorId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmY2MDc2OWI4N2IwYzU0MDc1YTYzMiIsImlhdCI6MTc1MjI0NjQxMSwiZXhwIjoxNzU0ODM4NDExfQ.mJbz4EZBXEhnOMy46TKWk0SNdN67r1VA0r7_xBleFco"
        const res = await axios({
            url:`http://127.0.0.1:5000/api/v1/users/doctor/${doctorId}`,
            method:"GET",
            headers:{
                Authorization:token
            }
        });
        const data = await res;
        
        console.log(data.data.data.reviews[0].comment)
        setReviews(data.data.data.reviews)
      } catch (err) {
        console.error("خطا در دریافت نظرات", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [doctorId]);

  if (loading) return <p>در حال بارگذاری نظرات...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">نظرات بیماران</h2>
      {reviews.length === 0 ? (
        <p className="text-center">هنوز نظری ثبت نشده است.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border rounded p-4 shadow-sm">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{review.name}</span>
              <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div className="text-yellow-500">
              {"⭐".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
