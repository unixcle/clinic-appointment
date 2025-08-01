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
  reviews:Review[];
};

export default function Reviews({ reviews }: ReviewsProps) {

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
